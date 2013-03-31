/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
define(function() {

	'use strict';

	var ClientInfo = function() {
		this.element = document.createElement('div');
		this.element.className = 'terminaljs-info';
	};

	ClientInfo.prototype = {
		appendTo: function(element) {
			element.appendChild(this.element);
			return this;
		},

		setContent: function (content) {
			this.element.innerHTML = content;
			return this;
		},

		clear: function() {
			this.element.innerHTML = '';
		}
	};

	return ClientInfo;
});