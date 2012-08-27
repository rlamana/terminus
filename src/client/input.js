/**
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {
	
	'use strict';

	var Events = require('events');
	var Styles = require('styles');

	/**
	 * Client Input class
	 * @class
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
		this.events = new Events();

		// DOM elements structure
		this.element = document.createElement('div');
		
		this.element.className = 'terminaljs-input-line';

		this.prompt = document.createElement('div');
		this.prompt.className = 'terminaljs-prompt';
		this.element.appendChild(this.prompt);

		this.text = document.createElement('div');
		this.text.className = 'terminaljs-input';
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
			Styles.addClass(this.element,'terminaljs-box');
			return this;
		},

		hide: function () {
			Styles.removeClass(this.element,'terminaljs-box');
			return this;
		},

		isVisible: function() {
			return (this.element.style.display !== 'none') && Styles.hasClass(this.element, 'terminaljs-box');
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

	return ClientInput;
});
