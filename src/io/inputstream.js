/**
 * Copyright © 2012 Ramón Lamana
 */
 
define(function(require) {
	
	'use strict';

	/**
	 * @dependecies
	 */
	var Promise = require('core/promise');
	var Events = require('core/events');

	var OutputStream = require('io/outputstream');

	/**
	 * @class
	 *
	 * events: read, data, end
	 */
	var InputStream = function() {
		this.events = new Events();

		this._buffer = [];
		this._promise = null;
	};

	InputStream.prototype = {
		read: function() {
			this.events.emit('read');
			this._promise = this._promise || (new Promise());

			return this._promise;
		}, 

		end: function() {
			var data;
			if(!this._promise)
				return;

			var data = this._buffer.join('');
			this._buffer = []; // Empty buffer
			this._promise.done(data);
			this._promise = null;
		},

		/**
		 * Connects an output stream with this input stream
		 */ 
		pipe: function(outputstream) {
			var self = this;

			if(!outputstream)
				outputstream = new OutputStream();
			
			outputstream.events.on('data', function(input) {
				this._buffer.push(input);
				this.events.emit('data', input);
			}, this);

			return outputstream;
		}
	};

	return InputStream;
	
});