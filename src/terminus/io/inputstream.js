/**
 * Copyright © 2012 Ramón Lamana
 */
 
define(function(require) {
	
	'use strict';

	/**
	 * @class
	 *
	 * methods: read, readLine
	 * events: data
	 */
	var InputStream = function() {
		this.stream = [];
	};

	InputStream.prototype = {
		read: function() {
			this.stream
		}, 

		readLine: function() {

		}
	};

	return InputStream;
	
});