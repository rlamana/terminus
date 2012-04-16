
(function(global) {
	
	'use strict';

	/**
	 * @class
	 */
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




