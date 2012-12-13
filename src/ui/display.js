/**
 * Copyright © 2012 Ramón Lamana
 */
 define(function(require) {

	'use strict';

	require('ui/styles');

	var Events 	= require('core/events');
	var Promise = require('core/promise');

	var Input 	= require('ui/input');
	var Output 	= require('ui/output');

	/**
	 * Widget 
	 */
	var Display = function(element, settings) {
		var self = this,
			setter;

		// Events support
		this.events = new Events();

				// Load settings
		for(var key in settings) {
			if (!settings.hasOwnProperty(key))
				continue;
			this.settings[key] = settings[key];
		}

		// Create DOM elements structure
		this.element = element;
		this.element.className = 'terminusjs';

		// Create DOM output element
		this.output = new Output();
		this.output.appendTo(this.element);

		// Create DOM input element
		this.input = new Input({
			editable: true
		});
		this.input.appendTo(this.element).show();

		this.input.events.on('enter', this.enter, this);
		this.input.events.on('historyBack', this.historyBack, this);
		this.input.events.on('historyForward', this.historyForward, this);
		this.input.events.on('autocomplete', this.autocomplete, this);

		this._currentInput = this.input;
		
		// CTRL + Z support
		element.addEventListener('keydown', function(e) {
			if(e.ctrlKey && e.keyCode == 90) {
				self.read();
			}
		});

		this.output.print(this.settings.welcome, 'web');
		this.prompt();
		
		element.addEventListener('click', function(e){
			self.focus();
		});

		if (!!this.settings.shell)
			this.connectShell(this.settings.shell);

		this._historyIndex = 0;
	};

	Display.prototype = {
		_shell: null,
		_historyIndex: 0,
		_currentInput: null,

		settings: {
	 		welcome: '<p>Terminus.js<br/>Copyright 2011-2012 Ramón Lamana.</p>'
		},

		focus: function(){
			this._currentInput.focus();
		},

		historyReset: function() {
			this._historyIndex = this._shell.history.length;
		},

		historyBack: function() {
			this._historyIndex--;
			var command = this._shell.history[this._historyIndex];

			if (command)
				this.input.setValue(command);
			else
				this._historyIndex = 0;
		},

		historyForward: function() {
			this._historyIndex++;
			var command = this._shell.history[this._historyIndex];

			if (command) 
				this.input.setValue(command);
			else 
				this.historyReset();
		},

		prompt: function(withContent) {
			this.input.clear()

			if(typeof withContent !== 'undefined')
				this.input.setValue(withContent);

			this.input.show();
			this.focus();
		},

		idle: function() {
			this.input.hide();
			this.element.focus();
		},

		enter: function(inputElement) {
			var command = inputElement.getValue(),
				promise = new Promise(),
				self = this;

			// Show command entered in output and hide 
			// prompt waiting for next read operation
			this._printInput();
			this.idle();

			promise.then(function() {
				self.prompt();
			});

			if(command === '') {
				promise.done();
				return;
			}

			if(!!this._shell) {
				// Execute Command
				this._shell.exec(command).then(function(){
					promise.done();
				});
			}

			this.historyReset();
		},

		autocomplete: function() {
			var commands = this._shell.search(this.input.getValue());

			if(commands.length > 1) {
				this._printInput();
				this.output.print(commands.join(' '), 'stdout');
				this.prompt(this.input.getValue());
			}
			else if(commands.length === 1) {
				this.prompt(commands[0]);
			}
		},

		connectShell: function (shell) {
			var streams = shell.streams;
			this._shell = shell;

			// Listen to its output streams
			streams.stdout.events.on('data', function(data){
				this.output.print(data, 'stdout');
			}, this);

			streams.stderr.events.on('data', function(data){
				this.output.print(data, 'stderr');
			}, this);

			streams.web.events.on('data', function(data){
				this.output.print(data, 'web');
			}, this);

			// Listen to other events on shell
			streams.stdin.events.on('clear', this.output.clear, this.output);

			// Listen to input read events
			streams.stdin.events.on('read', this._read, this);

			this.historyReset();
		},

		_read: function() {
			var input = new Input({
				prompt: '',
				editable: true
			});			

			this._currentInput = input;

			input.appendTo(this.element)
				.show()
				.focus();

			input.events.on('enter', function(input) {
				var stream = this._shell.streams.stdin.pipe();
				stream.write(input.getValue());
				this._shell.streams.stdin.end();

				input.setEditable(false);
				this.element.removeChild(input.element);
				this._currentInput = this.input; // restore to prompt
			}, this);
		},

		_printInput: function() {
			var commandElement = new Input();
			commandElement
				.setPrompt(this.input.getPrompt())
				.setValue(this.input.text.innerHTML)
				.show();

			this.output.printUserInput(commandElement.element.outerHTML);
		}
	};

	return Display;
});
