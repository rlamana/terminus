/**
 * Copyright © 2012 Ramón Lamana
 */

(function(global) {

	'use strict';

	var transitionTime = .2;

	// Class to support cross box model
	global.Styles.addRule('.terminaljs-box', "\
		display: -webkit-box; \
		display: -moz-box; \
		display: -o-box; \
		display: -ms-box; \
		display: box; \
	");

	// Default stylesheet rules for input and output elements
	global.Styles.addRule('.terminaljs-input-line', {
		'display': 'none',
		'clear': 'both',
		'-webkit-box-orient': 'horizontal',
		'-moz-box-orient': 'horizontal',
		'-ms-box-orient': 'horizontal',
		'-o-box-orient': 'horizontal',
		'box-orient': 'horizontal'
	});

	global.Styles.addRule('.terminaljs-input', {
		'display': 'block',
		'outline': 'none',
		'-webkit-box-flex': '1',
		'-moz-box-flex': '1',
		'-ms-box-flex': '1',
		'-o-box-flex': '1',
		'box-flex': '1'
	});

	global.Styles.addRule('.terminaljs .terminaljs-prompt', {
		'margin-right': '5px'
	});

	global.Styles.addRule('.terminaljs-output', {
		'clear': 'both'
	});

	global.Styles.addRule('.terminaljs-output .terminaljs-output-line', {
		'height': '0',
		'overflow': 'hidden',
		'-webkit-transition': 'height '+transitionTime+'s ease-in-out',
		'-moz-transition': 'height '+transitionTime+'s ease-in-out',
		'-ms-transition': 'height '+transitionTime+'s ease-in-out',
		'-o-transition': 'height '+transitionTime+'s ease-in-out',
		'transition': 'height '+transitionTime+'s ease-in-out'
	});

	global.Styles.addRule('.terminaljs-output .terminaljs-output-line.terminaljs-userinput', {
		'-webkit-transition': 'none',
		'-moz-transition': 'none',
		'-ms-transition': 'none',
		'-o-transition': 'none',
		'transition': 'none'
	});

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
			global.Styles.addClass(this.element,'terminaljs-box');
			return this;
		},

		hide: function () {
			global.Styles.removeClass(this.element,'terminaljs-box');
			return this;
		},

		isVisible: function() {
			return (this.element.style.display !== 'none') && global.Styles.hasClass(this.element, 'terminaljs-box');
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
	 * Client OutputLine class.
	 * Represents a line output element in the whole output stream.
	 */
	var ClientOutputLine = function(className) {
		var outputContent, outputLine = this.element = document.createElement('div');
		outputLine.className = 'terminaljs-output-line ' + (className || '');

		outputContent = this.outputContent = document.createElement('div');
		outputContent.className = 'terminaljs-output-content'
		outputLine.appendChild(outputContent);

		// When new output is generated, always scroll to bottom
		window.scrollTo(0,document.body.scrollHeight);
		
	};

	ClientOutputLine.prototype = {
		element: null,
		outputContent: null,

		appendTo: function(element) {
			element.appendChild(this.element);
			return this;
		},

		setContent: function(content) {
			this.outputContent.innerHTML = content;
		},

		show: function() {
			var self = this;

			setTimeout(function() {
				global.Styles.addClass(self.element, 'visible');
				self.element.style.height = self.outputContent.clientHeight + 'px';
			}, 30);
		},

		hide: function() {
			global.Styles.removeClass(this.element, 'visible');
			this.element.style.height = '0';
		}
	};


	/**
	 * Client Output class
	 */
	var ClientOutput = function() {
		this.element = document.createElement('div');
		this.element.className = 'terminaljs-output';
	};

	ClientOutput.prototype = {
		_print: function(content, className) {
			var outputLine = new ClientOutputLine(className);
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
					output = this._print(Util.String.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminaljs-stdout');
				break;
				case 'STDERR':
					output = this._print(Util.String.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminaljs-stderr');
				break;
				case 'WEB':
					output = this._print(content, 'terminaljs-web');
				break;
			}

			output.show();
			return this;
		},

		printUserInput: function(content) {
			this._print(content, 'terminaljs-userinput').show();
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