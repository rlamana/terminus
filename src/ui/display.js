/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {

	'use strict';

	var Events = require('core/events');
	var Promise = require('core/promise');
	var Util = require('core/util');

	var Prompt = require('ui/prompt');
	var Input = require('ui/input');
	var Output = require('ui/output');

	/**
	 * Widget
	 */
	var Display = function(element, settings) {
		var self = this;

		// Create the DOM element and append to body
		if(!element) {
			this.$el = document.createElement('div');
			document.body.appendChild(this.$el);
		}

		// Events support
		this.events = new Events();

		// Load settings
		for(var key in settings) {
			if (settings.hasOwnProperty(key))
				this.settings[key] = settings[key];
		}

		// Create DOM elements structure
		this.$el = element;
		Util.Styles.addClass(this.$el, 'terminusjs');

		// Create DOM output element
		this.output = new Output();
		this.output.appendTo(this.$el);

		// Create DOM prompt element
		this.prompt = new Prompt({
			editable: true
		});
		this.prompt.appendTo(this.$el).show();

		this.prompt.events.on('enter', this.enter, this);
		this.prompt.events.on('historyBack', this.historyBack, this);
		this.prompt.events.on('historyForward', this.historyForward, this);
		this.prompt.events.on('autocomplete', this.autocomplete, this);
		this.prompt.events.on('focus', function(){
			// When a key event, always scroll to bottom
			//window.scrollTo(0, document.body.scrollHeight);
		}, this);

		this._currentInput = this.prompt.input;

		// CTRL + Z support
		this.$el.addEventListener('keydown', function(e) {
			if(e.ctrlKey && e.keyCode === 90) {
				self.cancel();
			}
		});

		this.output.print(this.settings.welcome, 'web');
		this.showPrompt();

		element.addEventListener('click', function(){
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
			welcome: '<p>Terminus.js<br/>Copyright 2011-2013 Ramón Lamana.</p>'
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
				this.prompt.input.value = command;
			else
				this._historyIndex = 0;
		},

		historyForward: function() {
			this._historyIndex++;
			var command = this._shell.history[this._historyIndex];

			if (command)
				this.prompt.input.value = command;
			else
				this.historyReset();
		},

		showPrompt: function(withContent) {
			this.prompt.input.clear();

			if(typeof withContent !== 'undefined')
				this.prompt.input.value = withContent;

			this.prompt.show();
			this.prompt.input.focus();

			this.events.emit('prompt');
		},

		idle: function() {
			this.prompt.hide();
			this.$el.focus();
		},

		cancel: function() {
			this.prompt.show();
			this._currentInput = this.prompt.input;
			this.focus();
		},

		enter: function(input) {
			var command = input.value,
				promise = new Promise(),
				self = this;

			// Show command entered in output and hide
			// prompt waiting for next read operation
			this._printPrompt();
			this.idle();

			// When promise is done, put back prompt
			promise.then(function() {
				self.showPrompt();
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

		autocomplete: function(input) {
			var commands = this._shell.search(input.value);

			if(commands.length > 1) {
				this._printPrompt();
				this.output.print(commands.join(' '), 'stdout');
				this.showPrompt(input.value);
			}
			else if(commands.length === 1) {
				this.showPrompt(commands[0]);
			}
		},

		connectShell: function (shell) {
			var streams = shell.streams;
			this._shell = shell;

			// Listen to its output streams
			streams.stdout.events.on('write', function(data){
				this.output.print(data, 'stdout');
			}, this);

			streams.stderr.events.on('write', function(data){
				this.output.print(data, 'stderr');
			}, this);

			streams.web.events.on('write', function(data){
				this.output.print(data, 'web');
			}, this);

			// Listen to other events on shell
			this._shell.bus.on('clear', this.output.clear, this.output);

			// Listen to input events
			streams.stdin.reader = this.reader.bind(this);

			this.historyReset();
		},

		reader: function(promise) {
			var /*stdin = this._shell.streams.stdin,*/
				input = new Input({
					editable: true
				});

			this._currentInput = input;
			input.appendTo(this.$el).focus();

			input.events.on('enter', function(input) {
				var /*stream = new OutputStream(),*/
					data = input.value;

				promise.done(data);

				// Print out the input data
				this.output.print(data);

				// Restore input to the old prompt
				input.editable = false;
				this.$el.removeChild(input.$el);
				this._currentInput = this.prompt.input;
			}, this);
		},

		_printPrompt: function() {
			var copy = new Prompt();
			copy.ps = this.prompt.ps;
			copy.input.value = this.prompt.input.value;
			copy.show();

			this.output.print(copy.$el.outerHTML, 'web');
		}
	};

	return Display;
});
