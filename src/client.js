/**
 * Copyright © 2012 Ramón Lamana
 */

(function(global) {

	'use strict';

	/**
	 * Client Input class
	 */
	var ClientInput = function(settings) {
		var self = this;

		this.settings = {
			editable: false,
			prompt: '>'
		};

		for(var key in settings) {
			if (!settings.hasOwnProperty(key))
				continue;
			this.settings[key] = settings[key];
		}

		// Events support
		this.events = new global.Events();

		// DOM elements structure
		this.element = document.createElement('div');
		
		this.element.className = 'terminaljs-input-line';
		this.element.style.boxOrient = this.element.style.MozBoxOrient = this.element.style.WebkitBoxOrient  = 'horizontal';
		this.element.style.display = 'none';
		this.element.style.clear = 'both';

		this.prompt = document.createElement('div');
		this.prompt.className = 'terminaljs-prompt';
		this.element.appendChild(this.prompt);

		this.text = document.createElement('div');
		this.text.className = 'terminaljs-input';
		this.text.style.display = 'block';
		this.text.style.outline = 'none';
		Util.setCrossStyle(this.text, 'BoxFlex', '1');
		this.text.innerHTML = '';
		this.element.appendChild(this.text);

		if(!!this.settings.editable) {
			this.text.contentEditable = true;
			this.text.addEventListener('keydown', function(e) {
				// When a key event, alway scroll to bottom
				window.scrollTo(0,document.body.scrollHeight);
				switch(e.keyCode) {
					case 13: // Enter key
						e.preventDefault();
						e.stopPropagation();
						self.events.emit('enter', self);
						break;

					case 38: // Up key
						self.events.emit('historyBack', self);

						e.preventDefault();
						e.stopPropagation();
						break;

					case 40: // Down key
						self.events.emit('historyForward', self);

						e.preventDefault();
						e.stopPropagation();
						break;

					case 9: // Tab key
						self.events.emit('autocomplete', self);

						e.preventDefault();
						e.stopPropagation();
						break;
				}
			});
		}

		this.setPrompt(this.settings.prompt);
	};

	ClientInput.prototype = {
		getValue: function () {
			var input = this.text.innerText || this.text.textContent;
			var value = input ? input.replace(/\n/g, '') : '';
			value = value.replace(/^\s+|\s+$/g,"");
			return value;
		},

		setValue: function (value) {
			this.text.innerHTML = value;
			return this;
		},

		appendTo: function(element) {
			element.appendChild(this.element);
			return this;
		},

		setPrompt: function(prompt) {
			this.settings.prompt = prompt;
			this.prompt.innerHTML = prompt;
			return this;
		},

		getPrompt: function() {
			return this.settings.prompt;
		},

		focus: function () {
			this.text.focus();
			this.placeCursorToEnd();
			return this;
		},

		clear: function() {
			this.setValue('');
			return this;
		},

		show: function () {
			this.element.style.display = Util.getCrossCss(this.element, 'box');
			return this;
		},

		hide: function () {
			this.element.style.display = 'none';
			return this;
		},

		isVisible: function() {
			return this.element.style.display !== 'none';
		},

		placeCursorToEnd: function() {
			var range, selection;
		    if(document.createRange) { // Firefox, Chrome, Opera, Safari, IE 9+
		        range = document.createRange();
		        range.selectNodeContents(this.text);
		        range.collapse(false);
		        selection = window.getSelection();
		        selection.removeAllRanges();
		        selection.addRange(range);
		    } 
		    return this;
		}
	};


	/**
	 * Client Output class
	 */
	var ClientOutput = function() {
		this.element = document.createElement('div');
		this.element.className = 'terminaljs-output';
		this.element.style.clear = 'both';
	};

	ClientOutput.prototype = {
		_print: function(output, className) {
			var newOutput = document.createElement('div');
			newOutput.innerHTML = output;
			newOutput.className = className;
			this.element.appendChild(newOutput);

			// When new output is generated, always scroll to bottom
			window.scrollTo(0,document.body.scrollHeight);
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
			target = target || 'STDOUT';
			switch(target) {
				case 'STDOUT': 
					this._print(Util.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminaljs-stdout');
				break;
				case 'STDERR':
					this._print(Util.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminaljs-stderr');
				break;
				case 'WEB':
					this._print(content, 'terminaljs-web');
				break;
			}
			return this;
		},

		clear: function() {
			this.element.innerHTML = '';
		}
	};


	var ClientInfo = function() {
		this.element = document.createElement('div');
		this.element.className = 'terminaljs-info';
	};

	ClientInfo.prototype = {
		appendTo: function(element) {
			element.appendChild(this.element);
			return this;
		},

		setContent: function (content) {
			this.element.innerHTML = content;
			return this;
		},

		clear: function() {
			this.element.innerHTML = '';
		}
	};

	global.ClientInput = ClientInput;
	global.ClientOutput = ClientOutput;
	global.ClientInfo = ClientInfo;
})
( window );