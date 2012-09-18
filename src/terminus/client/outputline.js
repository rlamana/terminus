/**
 * Copyright © 2012 Ramón Lamana
 */
 define(function(require) {
	
	'use strict';

	//var Client = {};//require('cliente');
	var Styles = require('terminus/styles');

	/**
	 * Client OutputLine class.
	 * Represents a line output element in the whole output stream.
	 * @class
	 */
	var ClientOutputLine = function(className) {
		var outputContent, outputLine = this.element = document.createElement('div');
		outputLine.className = 'terminaljs-output-line ' + 
			(className || '') + 
			(Client.animations ? ' animate' : '');

		outputContent = this.outputContent = document.createElement('div');
		outputContent.className = 'terminaljs-output-content';
		outputLine.appendChild(outputContent);

		// When new output is generated, always scroll to bottom
		window.scrollTo(0,document.body.scrollHeight);
		
	};

	ClientOutputLine.prototype = {
		element: null,
		outputContent: null,

		appendTo: function(element) {
			element.appendChild(this.element);
			return this;
		},

		setContent: function(content) {
			this.outputContent.innerHTML = content;
		},

		show: function() {
			var self = this;
			var animations = Client.animations;

			var func = function() {
				Styles.addClass(self.element, 'visible');
				self.element.style.height = animations ? self.outputContent.clientHeight + 'px' : 'auto';
			};

			animations ? setTimeout(func, 30) : func();
		},

		hide: function() {
			Styles.removeClass(this.element, 'visible');
			this.element.style.height = '0';
		}
	};

	return ClientOutputLine;
});