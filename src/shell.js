
(function(global) {
	
	'use strict';

	var Shell = function(terminal, commander) {
		this._environment = {
		};

		this.setCommander(commander);
		this.setTerminal(terminal);
	};

	Shell.prototype = {
		commander: null,
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
			input = this.parse(input);

			if (this.native[input.command]) {
				this.native[input.command].apply(this, input.args);
			}
			else if (this.commander.commands[input.command]) {
				this.commander.commands[input.command].apply(this.commander, input.args); // Call commanders command, always with the scope of the commander itself
			} else {
				this.terminal.print("Command '"+input.command+"' not found.", 'STDERR');
				this.terminal.read();
			}
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
		setCommander: function(commander) {
			this.commander = commander; 
			this.commander.events.on('output', this.output, this);
			this.commander.events.on('done', this.done, this);
			this.commander.events.on('info', this.info, this);
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
				var found = [], commands = this.commander.getCommands();
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




