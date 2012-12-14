/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {
	
	'use strict';

	var Events = require('core/events');

	/**
	 * @class
	 */
	var OutputStream = function() {
		this.events = new Events();
		this.close = false;

		this._buffer = [];
	};

	OutputStream.prototype = {
		events: null,

		/** 
		 * @property {bool} close 
		 */
		set close(value) {
			// Cannot be reopened
			if(this._close) return; 

			if(value === true)
				this.events.emit('close');

			this._close = !!value;
		},

		get close() {
			return this._close;
		},

		/**
		 * Writes the content of output to the stream.
		 * @param {String} output
		 */
		write: function(output) {
			if(this.close) 
				return;

			output += ''; // Stringify output

			this._buffer.push(output);
			this.events.emit('data', output);
		}
	};

	return OutputStream;
});