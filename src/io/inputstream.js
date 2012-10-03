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

	/**
	 * @class
	 *
	 * methods: read, readLine
	 * events: data
	 */
	var InputStream = function() {
		// Events support
		this.events = new Events();

		this.stream = [];
	};

	InputStream.prototype = {
		read: function() {
			var ret = this.stream;
			this.stream = [];
			return ret;
		}, 

		readLine: function() {
		},

		_put: function(data) {
			this.stream.push(data);
			this.events.emit('data');
		}
	};

	return InputStream;
	
});