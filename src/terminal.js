/**
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {
	
	'use strict';

	var Events = require('events');
	var Styles = require('styles');

	var Commander = require('commander');
	var Shell = require('shell');

	var ClientOutput = require('client/output');
	var ClientInput = require('client/input');

	// Default stylesheet rule
	
	Styles.addRule('.terminaljs', {
		'height': '100%',
		'padding': '10px',
		'color': '#fff',
		'background-color': '#111',
		'font-family': 'monospace'
	});

	/**
	 * @class
	 */
	var Terminal = function(element, settings) {
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

		this.outputElement = new ClientOutput();
		this.outputElement.appendTo(element);

		this.inputElement = new ClientInput({
			editable: true
		});
		this.inputElement.events.on('enter', this.enter, this);
		this.inputElement.events.on('historyBack', this.historyBack, this);
		this.inputElement.events.on('historyForward', this.historyForward, this);
		this.inputElement.events.on('autocomplete', this.autocomplete, this);
		this.inputElement.appendTo(element);

		// CTRL + Z support
		element.addEventListener('keydown', function(e) {
			if(e.ctrlKey && e.keyCode == 90) {
				self.read();
			}
		});

		// Init history
		this.historyInit();

		this.print(this.settings.welcome, 'WEB');
		this.read();
		
		element.addEventListener('click', function(e){
			self.inputElement.focus();
		});
	};

	Terminal.prototype = {
		settings: {
			welcome: "<p>Terminal.js 0.2<br/>Copyright 2011-2012 Ramón Lamana.</p>"
		},

		focus: function(){
			this.inputElement.focus();
		},

		historyInit: function() {
			this._historyIndex = 0;
			this._history = [];
		},

		historyReset: function() {
			this._historyIndex = this._history.length;
		},

		historyBack: function() {
			this._historyIndex--;
			var command = this._history[this._historyIndex];

			if (command)
				this.read(command);
			else
				this._historyIndex = 0;
		},

		historyForward: function() {
			this._historyIndex++;
			var command = this._history[this._historyIndex];

			if (command) 
				this.read(command);
			else 
				this.historyReset();
		},

		history: function() {
			return this._history;
		},

		read: function(withContent) {
			this.inputElement.clear()

			if(typeof withContent !== 'undefined')
				this.inputElement.setValue(withContent);

			this.inputElement.show().focus();
		},

		idle: function() {
			this.inputElement.hide();
			this.element.focus();
		},

		/**
		 * @param {String} target The output target: 'STDOUT', 'STDERR', 'WEB'.
		 * @param {String} content Output content to be printed.
		 * @return {OutputElement} Itself to call in cascade.
		 */
		print: function(content, target) {
			target = target || 'STDOUT';
			this.outputElement.print(content, target);
		},

		clear: function() {
			this.outputElement.clear();
		},

		enter: function(inputElement) {
			var command = inputElement.getValue();

			// Show command entered in output and hide 
			// prompt waiting for next read operation
			this._printInput();
			this.idle();

			if(command === '') {
				this.read();
				return
			}
			this._history.push(command);
			this.historyReset();
			
			// Execute command
			this.events.emit('read', command);
		},

		autocomplete: function() {
			// Execute the internal _autocomplete method with 
			// the input as parameter
			this.events.emit('read', '_autocomplete ' + this.inputElement.getValue());
		},

		autocompleteProposal: function(commands) {
			if(commands.length > 1) {
				this._printInput();
				this.print(commands.join(' '), "STDOUT");
				this.read(this.inputElement.getValue());
			}
			else if(commands.length === 1) {
				this.read(commands[0]);
			}
		},
		
		setPrompt: function(prompt) {
			this.inputElement.setPrompt(prompt);
		},

		setInfo: function(content) {
			this.infoElement.setContent(info);
		},

		_printInput: function() {
			var commandElement = new ClientInput();
			commandElement
				.setPrompt(this.inputElement.getPrompt())
				.setValue(this.inputElement.text.innerHTML)
				.show();

			this.outputElement.printUserInput(commandElement.element.outerHTML);
		}
	}

	Terminal.Commander = require('commander');
	Terminal.Shell = require('shell');

	return Terminal;

});
