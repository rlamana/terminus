/**
 * Copyright © 2012 Ramón Lamana
 */
 define(function(require) {
	
	'use strict';

	var Util = require('core/util');
	var Promise = require('core/promise');

	var Commander = require('commander');

	var Process = require('system/process');
	var InputStream = require('io/inputstream');
	var OutputStream = require('io/outputstream');

	/**
	 * @class
	 */
	var Shell = function(commands) {
		this._environment = {
		};

		if(commands)
			this.addCommands(commands);

		// Create Standard Streams
		this.streams = {
			stdin: new InputStream(),
			stdout: new OutputStream(),
			err: new OutputStream(),
			web: new OutputStream()
		};

		this.commands = [];
		this.history = [];
	};

	Shell.prototype = {
		commands: null,
		streams: null,
		history: null,

		_environment: null,
		
		getEnv: function(key) {
			return this._environment[key] ? this._environment[key] : null;
		},

		exec: function(input) {
			var commandsGroup, proc;

			this.history.push(input);

			input = this._parse(input);

			// Execute first shell native commands
			if (this.native[input.command]) {
				this.native[input.command].apply(this, input.args);
				return Promise.done();
			} else {
				// Search command in commander stack
				for(var i = this.commands.length; i--;) {
					commandsGroup = this.commands[i];
					if (commandsGroup[input.command]) {
						var proc = new Process(this.streams);
						return proc.exec(commandsGroup[input.command], input.args); // Return promise
					} 
				}
			}

			this.streams.err.write("Command '"+input.command+"' not found.");

			return Promise.done();
		},

		search: function(key) {
			var found = [], commands = [];

			for(var i = this.commands.length; i--;) 
				commands = Util.Array.merge(commands, Object.keys(this.commands[i]));
			
			var regexp = new RegExp('^'+key, "i");

			// Proposal only for commands not for arguments
			//if(arguments.length <= 1) {
				for (var i = commands.length; i--;) {
					if (regexp.test(commands[i])) {
						found.push(commands[i]);
					}
				}
			//}
			// @todo proposal for arguments asking the commander. Adding else here.

			return found;
		},

		/**
		 * Attaches a commander and start listening to its done event
		 */
		addCommands: function(commands) {
			this.commands.push(commands); 
		},

		/**
		 * Parse input string to get commands and args
		 */
		_parse: function(input) {
			var command, args = input.split(' ');
			command = args[0];
			args.shift();
			return {
				command: command,
				args: args
			};
		},

		/**
		 * Shell native commands
		 */
		native: {
			history: function() {
				var output = ''
				for(var i=0, l=this.history.length; i<l; i++)
					output += ' ' + i + ': ' + this.history[i] + '\n';

				this.streams.stdout.write(output);
			},

			clear: function() {
				this.streams.stdin.events.emit('clear');
			}
		}
	};

	return Shell;
});




