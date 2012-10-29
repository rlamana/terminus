/**
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {
	
	'use strict';

	var Events = require('core/events');
	var Util = require('core/util');
	
	var OutputLine = require('ui/outputline');
	
	/**
	 * Client Output class
	 * @class
	 */
	var Output = function() {
		this.element = document.createElement('div');
		this.element.className = 'terminusjs-output';
	};

	Output.prototype = {
		_print: function(content, className) {
			var outputLine = new OutputLine(className);
			outputLine.appendTo(this.element);
			outputLine.setContent(content);
			return outputLine;
		},

		appendTo: function(element) {
			element.appendChild(this.element);
			return this;
		},

		/**
		 * @param {String} target The output target: 'STDOUT', 'STDERR', 'WEB'.
		 * @param {String} content Output content to be printed.
		 * @return {ClientOutput} Itself to call in cascade.
		 */
		print: function(content, target) {
			var output;
			target = target || 'STDOUT';
			switch(target) {
				case 'STDOUT': 
					output = this._print(Util.String.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminusjs-stdout');
				break;
				case 'STDERR':
					output = this._print(Util.String.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminusjs-stderr');
				break;
				case 'WEB':
					output = this._print(content, 'terminusjs-web');
				break;
			}

			output.show();
			return this;
		},

		printUserInput: function(content) {
			this._print(content, 'terminusjs-userinput').show();
		},

		clear: function() {
			this.element.innerHTML = '';
		}
	};

	return Output;
});