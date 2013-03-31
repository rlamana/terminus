/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {

	'use strict';

	var Promise = require('core/promise');
	var Events = require('core/events');

	/**
	 * @class
	 */
	var InputStream = function() {
		this.events = new Events();
		this._buffer = [];

		// Default reader function
		this.reader = function(promise) {
			var data = this._buffer.join('');
			this._buffer = [];
			promise.done(data);
		};
	};

	InputStream.prototype = {
		events: null,

		/**
		 * @return {Promise}
		 */
		read: function() {
			var promise = new Promise();

			// Call reader function
			this._reader.call(this, promise);
			this.events.emit('read');

			return promise;
		},

		/**
		 * Set reader function.
		 * This function receives promise.
		 *    function(promise){}
		 */
		set reader(func) {
			this._reader = func;
		},

		get reader() {
			return this._reader;
		},

		/**
		 * Connects an output stream with this input stream
		 */
		pipe: function(outputstream) {
			var self = this;
			outputstream.writer = function(data) {
				self._buffer.push(data);
			};

			return this;
		}
	};

	return InputStream;

});