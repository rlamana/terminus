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

		// Default writer
		this.writer = function(data) {
			this._buffer.push(data);
		};
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
		 * Set writer function.
		 * The function will receive data to write.
		 *    function(data){}
		 */
		set writer(func) {
			this._writer = func;
		},

		get writer() {
			return this._writer;
		},

		/**
		 * Writes the content of output to the stream.
		 * @param {String} output
		 */
		write: function(data) {
			if(this.close) return;

			data += ''; // Stringify output
			this.events.emit('write', data);
			this._writer.call(this, data);
		}
	};

	return OutputStream;
});