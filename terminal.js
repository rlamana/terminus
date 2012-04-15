/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {
	
	'use strict';

	var Util = {
		String: {
			htmlEntities: function (str) {
				return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
			},

			htmlStrip: function (str) {
				return String(str).replace(/&/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
			},
		},
		
		Array: {
			merge: function(/* variable number of arrays */){
				var result = [];
			    for(var i = 0; i < arguments.length; i++){
			        var array = arguments[i];
			        for(var j = 0; j < array.length; j++){
			            if(result.indexOf(array[j]) === -1) {
			                result.push(array[j]);
			            }
			        }
			    }
			    return result;
			}
		}
	};

	global.Util = Util;
})
( window );/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {
	
	'use strict';

	var Events = function() {
		this.__listeners = {};
	};

	Events.prototype = {
		on: function(eventName, listener, scope) {
			if(!this.__listeners[eventName])
				this.__listeners[eventName] = [];

			if (!listener)
				console.error('events.on(): The listener doesn\'t exist');

			this.__listeners[eventName].push(listener.bind(scope?scope:this));
		},

		emit: function() {
			var eventName, data = Array.prototype.slice.call(arguments);

			if (arguments.length === 0)
				console.error('Events.emit(): Incorrect number of parameters');

			eventName = arguments[0];
			if(!this.__listeners[eventName])
				return;

			data.shift();
			for(var i=this.__listeners[eventName].length; i--; )
				this.__listeners[eventName][i].apply(null, data); // Listeners have been binded
		}
	};

	global.Events = Events;
	
})( window );/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {
	
	'use strict';

	var Styles = {
		_styleSheet: null,

		addRule: function (selector, declaration) {  
			var declarationStr = declaration;

			// Create styleshee if it doesn't exist
			if(!this._styleSheet) {
				var style = document.createElement('style');

				if(!document.head)
					return;

				//document.head.appendChild(style);
				document.head.insertBefore(style, document.head.childNodes[0]); // Before all other defined styles
				this._styleSheet = document.styleSheets[document.styleSheets.length - 1];
			}

			if (typeof declaration !== 'string') {
				declarationStr = ''
				

				for(var style in declaration) {
					if(!declaration.hasOwnProperty(style))
						continue;

					declarationStr += style + ': ' + declaration[style] + ';';
				}
	  		}

			this._styleSheet.insertRule(selector + '{' + declarationStr + '}', 0);  
		},  

		hasClass: function (element, className) {
			return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
		},

		addClass: function(element, className) {
			if (!this.hasClass(element, className)) 
				element.className += " " + className;
		},

		removeClass: function(element, className) {
			if (this.hasClass(element, className)) {
				var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
				element.className = element.className.replace(reg,' ');
			}
		}
	};

	global.Styles = Styles;
})
( window );
/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {
	
	'use strict';

	var Process = function(input, outputStd, outputErr, outputWeb) {
		this.inputStream = input;
		this.outputStream.std = outputStd;
		this.outputStream.err = outputErr;
		this.outputStream.web = outputWeb;
	};

	Process.prototype = {
		inputStream: null,
		outputStream: {
			std: null,
			err: null,
			web: null
		},
		
		read: function() {
			this.events.emit('output', output || '', target || 'STDOUT');
		},

		write: function(output, target) {
			
		},

		exit: function(value) {
			this.events.emit('exit', value || '0');
		},

		info: function(content) {
			this.events.emit('done', content);
		},
	};

	global.Process = Process;
	
})( window );/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {
	
	'use strict';

	var Commander = function() {
		this.events = new global.Events;
	};

	Commander.prototype = {		
		output: function(output, target) {
			this.events.emit('output', output || '', target || 'STDOUT');
		},

		done: function(output, target) {
			this.events.emit('done', output || '', target || 'STDOUT');
		},

		info: function(content) {
			this.events.emit('done', content);
		},

		getCommands: function() {
			var commands = [], command;
			for (var commandName in this.commands) {
				if (this.commands.hasOwnProperty(commandName)) 
					commands.push(commandName);
			}
			return commands;
		},

		commands: {
		}
	};

	global.Commander = Commander;
})
( window );
(function(global) {
	
	'use strict';

	var Shell = function(terminal, commander) {
		this._environment = {
		};

		if(commander)
			this.addCommander(commander);

		if(terminal)
			this.setTerminal(terminal);
	};

	Shell.prototype = {
		commanders: [],
		terminal: null,

		_environment: null,
		

		getEnv: function(key) {
			return this._environment[key] ? this._environment[key] : null;
		},

		parse: function(input) {
			var command, args = input.split(' ');
			command = args[0];
			args.shift();
			return {
				command: command,
				args: args
			};
		},

		exec: function(input) {
			var commander;
			input = this.parse(input);

			if (this.native[input.command]) {
				this.native[input.command].apply(this, input.args);
				return;
			}

			// Search command in commander stack
			for(var i = this.commanders.length; i--;) {
				commander = this.commanders[i];
				if (commander.commands && commander.commands[input.command]) {
					// Call commander's command, always with the scope of the commander itself
					commander.commands[input.command].apply(commander, input.args); 
					return;
				} 
			}

			this.terminal.print("Command '"+input.command+"' not found.", 'STDERR');
			this.terminal.read();
		},

		output: function(content, target) {
			target = target || 'STDOUT';
			this.terminal.print(content, target);
		},

		done: function(content, target) {
			if(content)
				this.output(content, target);

			this.terminal.read();
		},

		info: function(content) {
			this.terminal.setInfo(content);
		},

		/**
		 * Attaches a terminal and start listening to its read events 
		 */
		setTerminal: function(terminal) {
			this.terminal = terminal; 
			this.terminal.events.on('read', this.exec, this);
		},

		/**
		 * Attaches a commander and start listening to its done event
		 */
		addCommander: function(commander) {
			this.commanders.push(commander); 
			commander.events.on('output', this.output, this);
			commander.events.on('done', this.done, this);
			commander.events.on('info', this.info, this);
		},

		native: {
			history: function() {
				var output = '', history = this.terminal.history();
				for(var i=0, l=history.length; i<l; i++)
					output += ' ' + i + ': ' + history[i] + '\n';

				this.output(output);
				this.done();
			},

			clear: function() {
				this.terminal.clear();
				this.terminal.read();
			},

			_autocomplete: function(command) {
				var found = [], commands = [];

				for(var i = this.commanders.length; i--;) 
					commands = global.Util.Array.merge(commands, this.commanders[i].getCommands());
				
				var regexp = new RegExp('^'+command, "i");

				// Proposal only for commands not for arguments
				if(arguments.length <= 1) {
					for (var i = commands.length; i--;) {
						if (regexp.test(commands[i])) {
							found.push(commands[i]);
						}
					}
				}
				// @todo proposal for arguments asking the commander. Adding else here.

				this.terminal.autocompleteProposal(found);
			}
		}
	};

	global.Shell = Shell;
})
( window );




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
		'overflow': 'hidden'
	});

	global.Styles.addRule('.terminaljs-output .terminaljs-output-line.animate', {
		'-webkit-transition': 'height '+transitionTime+'s ease-in-out',
		'-moz-transition': 'height '+transitionTime+'s ease-in-out',
		'-ms-transition': 'height '+transitionTime+'s ease-in-out',
		'-o-transition': 'height '+transitionTime+'s ease-in-out',
		'transition': 'height '+transitionTime+'s ease-in-out'
	});

	global.Styles.addRule('.terminaljs-output .terminaljs-output-line.terminaljs-userinput', {
		'-webkit-transition': 'none !important',
		'-moz-transition': 'none !important',
		'-ms-transition': 'none !important',
		'-o-transition': 'none !important',
		'transition': 'none !important'
	});

	/**
	 * Client Object with client configuration
	 */
	var Client = {
		animations: true
	};


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
		outputLine.className = 'terminaljs-output-line ' + 
			(className || '') + 
			(global.Client.animations ? ' animate' : '');

		outputContent = this.outputContent = document.createElement('div');
		outputContent.className = 'terminaljs-output-content';
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
			var animations = global.Client.animations;

			var func = function() {
				global.Styles.addClass(self.element, 'visible');
				self.element.style.height = animations ? self.outputContent.clientHeight + 'px' : 'auto';
			};

			animations ? setTimeout(func, 30) : func();
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
					output = this._print(global.Util.String.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminaljs-stdout');
				break;
				case 'STDERR':
					output = this._print(global.Util.String.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminaljs-stderr');
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

	global.Client = Client;
	global.ClientInput = ClientInput;
	global.ClientOutput = ClientOutput;
	global.ClientInfo = ClientInfo;
})
( window );/**
 * Copyright © 2012 Ramón Lamana
 */
 
 (function(global) {
	
	'use strict';

	// Default stylesheet rule
	global.Styles.addRule('.terminaljs', {
		'height': '100%',
		'padding': '10px',
		'color': '#fff',
		'background-color': '#111',
		'font-family': 'monospace'
	});

	var Terminal = function(element, settings) {
		var self = this;
		this.element = element;

		// Events support
		this.events = new global.Events();

		// Load settings
		for(var key in settings) {
			if (!settings.hasOwnProperty(key))
				continue;
			this.settings[key] = settings[key];
		}

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
			var commandElement = new global.ClientInput();
			commandElement
				.setPrompt(this.inputElement.getPrompt())
				.setValue(this.inputElement.text.innerHTML)
				.show();

			this.outputElement.printUserInput(commandElement.element.outerHTML);
		}
	}

	global.Terminal = Terminal;

})
( window );
