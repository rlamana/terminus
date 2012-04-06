/**
 * Copyright © 2012 Ramón Lamana
 */
 
 (function(global) {
	
	'use strict';

	var Terminal = function(element) {
		var self = this;

		// Events support
		this.events = new global.Events();

		// Create DOM elements structure
		element.className = 'terminaljs';

		this.outputElement = new global.ClientOutput();
		this.outputElement.appendTo(element);

		this.inputElement = new global.ClientInput({
			editable: true
		});
		this.inputElement.events.on('enter', this.enter, this);
		this.inputElement.events.on('historyBack', this.historyBack, this);
		this.inputElement.events.on('historyForward', this.historyForward, this);
		this.inputElement.appendTo(element);

		// Init history
		this.historyInit();

		this.print("Terminal.js 0.1\n\n"); //\nCopyright Ramón Lamana 2012.\n\n");
		this.read();
		
		element.addEventListener('click', function(e){
			self.inputElement.focus();
		});
	};

	Terminal.prototype = {
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
		
		setPrompt: function(prompt) {
			this.inputElement.setPrompt(prompt);
		},

		setInfo: function(content) {
			this.infoElement.setContent(info);
		},

		_printInput: function() {
			var commandElement = new global.ClientInput();
			commandElement
				.setPrompt(this.inputElement.getPrompt())
				.setValue(this.inputElement.text.innerHTML)
				.show();

			this.print(commandElement.element.outerHTML, 'WEB'); 
		}
	}

	global.Terminal = Terminal;

})
( window );
