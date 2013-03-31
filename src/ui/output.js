/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {

	'use strict';

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
		/**
		 * @param {String} target The output target: 'stdout', 'stderr', 'web'.
		 * @param {String} content Output content to be printed.
		 * @return {ClientOutput} Itself to call in cascade.
		 */
		print: function(content, target) {
			var output;
			target = target || 'stdout';
			switch(target) {
			case 'stdout':
				output = this._print(Util.String.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminusjs-stdout');
				break;
			case 'stderr':
				output = this._print(Util.String.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminusjs-stderr');
				break;
			case 'web':
				output = this._print(content, 'terminusjs-web');
				break;
			}

			output.show();
			return this;
		},

		clear: function() {
			this.element.innerHTML = '';
		},

		appendTo: function(element) {
			element.appendChild(this.element);
			return this;
		},

		_print: function(content, className) {
			var outputLine = new OutputLine(className);
			outputLine.appendTo(this.element);
			outputLine.setContent(content);
			return outputLine;
		}
	};

	return Output;
});