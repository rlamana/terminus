/**
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