/**
 * Copyright © 2012 Ramón Lamana
 */
 define(function(require) {

	'use strict';

	var Styles = require('terminus/styles');
	var Events = require('terminus/events');

	var Input = require('terminus/client/input');
	var Output = require('terminus/client/output');

	var transitionTime = .2;

	Styles.addRule('.terminaljs', {
		'height': '100%',
		'padding': '10px',
		'color': '#fff',
		'background-color': '#111',
		'font-family': 'monospace'
	});

	// Class to support cross box model
	Styles.addRule('.terminaljs-box', "\
		display: -webkit-box; \
		display: -moz-box; \
		display: -o-box; \
		display: -ms-box; \
		display: box; \
	");

	// Default stylesheet rules for input and output elements
	Styles.addRule('.terminaljs-input-line', {
		'display': 'none',
		'clear': 'both',
		'-webkit-box-orient': 'horizontal',
		'-moz-box-orient': 'horizontal',
		'-ms-box-orient': 'horizontal',
		'-o-box-orient': 'horizontal',
		'box-orient': 'horizontal'
	});

	Styles.addRule('.terminaljs-input', {
		'display': 'block',
		'outline': 'none',
		'-webkit-box-flex': '1',
		'-moz-box-flex': '1',
		'-ms-box-flex': '1',
		'-o-box-flex': '1',
		'box-flex': '1'
	});

	Styles.addRule('.terminaljs .terminaljs-prompt', {
		'margin-right': '5px'
	});

	Styles.addRule('.terminaljs-output', {
		'clear': 'both'
	});

	Styles.addRule('.terminaljs-output .terminaljs-output-line', {
		'height': '0',
		'overflow': 'hidden'
	});

	Styles.addRule('.terminaljs-output .terminaljs-output-line.animate', {
		'-webkit-transition': 'height '+transitionTime+'s ease-in-out',
		'-moz-transition': 'height '+transitionTime+'s ease-in-out',
		'-ms-transition': 'height '+transitionTime+'s ease-in-out',
		'-o-transition': 'height '+transitionTime+'s ease-in-out',
		'transition': 'height '+transitionTime+'s ease-in-out'
	});

	Styles.addRule('.terminaljs-output .terminaljs-output-line.terminaljs-userinput', {
		'-webkit-transition': 'none !important',
		'-moz-transition': 'none !important',
		'-ms-transition': 'none !important',
		'-o-transition': 'none !important',
		'transition': 'none !important'
	});

	/**
	 * Client Object with client configuration
	 * @singleton
	 */
	var Client = function(element, settings) {
		var self = this;

		this.element = element;

		// Events support
		this.events = new Events();

		// Load settings
		for(var key in settings) {
			if (!settings.hasOwnProperty(key))
				continue;
			this.settings[key] = settings[key];
		}

		// Create DOM elements structure
		element.className = 'terminaljs';

		// Create DOM output element
		this.outputElement = new Output();
		this.outputElement.appendTo(element);

		// Create DOM input element
		this.inputElement = new Input({
			editable: true
		});
		this.inputElement.appendTo(element).show();

		/*this.inputElement.events.on('enter', this.enter, this);
		this.inputElement.events.on('historyBack', this.historyBack, this);
		this.inputElement.events.on('historyForward', this.historyForward, this);
		this.inputElement.events.on('autocomplete', this.autocomplete, this);*/
		

		// CTRL + Z support
		element.addEventListener('keydown', function(e) {
			if(e.ctrlKey && e.keyCode == 90) {
				self.read();
			}
		});

		// Init history
		/*this.historyInit();

		this.print(this.settings.welcome, 'WEB');
		this.read();
		
		element.addEventListener('click', function(e){
			self.inputElement.focus();
		});*/
	};

	Client.prototype = {
	 	settings: {
	 		welcome: "<p>Terminal.js 0.3<br/>Copyright 2011-2012 Ramón Lamana.</p>"
	 	},
	};

	return Client;
});
