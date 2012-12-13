/**
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {
	
	'use strict';

	var domready = require('vendor/domready');

	/**
	 * Helper that creates a terminal with a default display and shell.
	 * 
	 * @param {String|Element} DOM element or selector where display will be rendered
	 * @param {Object} displaySettings Optional display parameters 
	 * @constructor
	 */
	var Terminus = function(element, displaySettings) {
		var self = this;

		// Setup shell
		this.shell = displaySettings.shell || (new Terminus.Shell());
		if(!this.shell || !(this.shell instanceof Terminus.Shell)) {
			console.error('Terminus.constructor: Provided shell not valid');
			return;
		}
		displaySettings.shell = this.shell;

		// Setup display
		domready(function(){
			element = (typeof element === 'string') ? 
				document.querySelector(element) :
				element;

			self.display = new Terminus.Display(element, displaySettings);
		});
	};

	Terminus.prototype = {
		/**
		 * @property {Terminus.Shell} shell 
		 * @readonly
		 */
		set shell(value) {
			if(!this._shell)
				this._shell = value;
		},

		get shell() {
			return this._shell;
		},

		/**
		 * @property {Terminus.Display} display 
		 * @readonly
		 */
		set display(value) {
			if(!this._display)
				this._display = value;
		},

		get display() {
			return this._display;
		}
	};
	
	Terminus.version = '0.5.2';

	Terminus.Display = require('ui/display');
	Terminus.Shell 	 = require('system/shell');
	Terminus.Process = require('system/process');

	return Terminus;
});
