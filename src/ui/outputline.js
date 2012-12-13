/**
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {
	
	'use strict';

	var Util = require('core/util');

	/**
	 * Client OutputLine class.
	 * Represents a line output element in the whole output stream.
	 * @class
	 */
	var OutputLine = function(className) {
		var outputContent, outputLine = this.element = document.createElement('div');
		outputLine.className = 'terminusjs-output-line ' + 
			(className || '');/* + 
			(Client.animations ? ' animate' : '');*/

		outputContent = this.outputContent = document.createElement('div');
		outputContent.className = 'terminusjs-output-content';
		outputLine.appendChild(outputContent);

		// When new output is generated, always scroll to bottom
		window.scrollTo(0,document.body.scrollHeight);
		
	};

	OutputLine.prototype = {
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
			var animations = false; //Client.animations;

			var func = function() {
				Util.Styles.addClass(self.element, 'visible');
				self.element.style.height = animations ? self.outputContent.clientHeight + 'px' : 'auto';
			};

			animations ? setTimeout(func, 30) : func();
		},

		hide: function() {
			Util.Styles.removeClass(this.element, 'visible');
			this.element.style.height = '0';
		}
	};

	return OutputLine;
});