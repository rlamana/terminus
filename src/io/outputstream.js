/**
 * Copyright © 2012 Ramón Lamana
 */
 
define(function(require) {
	
	'use strict';

	var Promise = require('core/promise');
	var Events = require('core/events');

	/**
	 * @class
	 */
	var OutputStream = function() {
		// Events support
		this.events = new Events();
		
		this.stream = [];
	};

	OutputStream.prototype = {
		write: function(output) {
			this.stream.push(output);
			this.events.emit('data', output);
		}
	};

	return OutputStream;
});