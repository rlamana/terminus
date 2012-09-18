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
	var Input = function() {
		this.stream = [];
	};

	Input.prototype = {
		read: function() {
			this.stream
		}, 

		readLine: function() {

		}
	};

	return Input;
	
});