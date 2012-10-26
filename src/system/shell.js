/**
 * Copyright © 2012 Ramón Lamana
 */
 define(function(require) {
	
	'use strict';

	var Util = require('core/util');
	var Commander = require('commander');

	var Process = require('system/process');

	/**
	 * @class
	 */
	var Shell = function(display, commander) {
		this._environment = {
		};

		if(commander)
			this.addCommander(commander);

		if(display)
			this.setDisplay(display);
	};

	Shell.prototype = {
		commanders: [],
		display: null,

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
					var proc = new Process();
					proc.events.on('exit', this.done);

					// Call commander's command with the scope of the new created process
					//commander.commands[input.command].apply(proc, input.args); 

					// Call commander's command, always with the scope of the commander itself
					commander.commands[input.command].apply(commander, input.args); 
					return;
				} 
			}

			this.display.print("Command '"+input.command+"' not found.", 'STDERR');
			this.display.read();
		},

		output: function(content, target) {
			target = target || 'STDOUT';
			this.display.print(content, target);
		},

		done: function(content, target) {
			//if(content)
			//	this.output(content, target);

			this.display.read();
		},

		info: function(content) {
			this.display.setInfo(content);
		},

		/**
		 * Attaches a display and start listening to its read events 
		 */
		setDisplay: function(display) {
			this.display = display; 
			this.display.events.on('read', this.exec, this);
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
				var output = '', history = this.display.history();
				for(var i=0, l=history.length; i<l; i++)
					output += ' ' + i + ': ' + history[i] + '\n';

				this.output(output);
				this.done();
			},

			clear: function() {
				this.display.clear();
				this.display.read();
			},

			_autocomplete: function(command) {
				var found = [], commands = [];

				for(var i = this.commanders.length; i--;) 
					commands = Util.Array.merge(commands, this.commanders[i].getCommands());
				
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

				this.display.autocompleteProposal(found);
			}
		}
	};

	return Shell;
});




