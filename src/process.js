/**
 * Copyright © 2012 Ramón Lamana
 */
 define(function(require) {
	
	'use strict';

	var Process;
	var Events = require('events');
	var InputStream = require('io/inputstream');
	var OutputStream = require('io/outputstream');

	/**
	 * @private
	 */
	var ProcessTable = {
		list: [],

		register: function(process) {
			if(!(process instanceof Process))
				console.error('Trying to register a non Process object');

			this.list.push(process);
			return this.list.length - 1;
		}
	};

	/**
	 * @class
	 */
	Process = function(input, outputStd, outputErr, outputWeb) {
		this.pid = ProcessTable.register(this);
		this.events = new Events;

		this.inputStream = input;
		this.outputStream.std = outputStd;
		this.outputStream.err = outputErr;
		this.outputStream.web = outputWeb;
	};

	Process.prototype = {
		pid: null,

		inputStream: null,
		outputStream: {
			std: null,
			err: null,
			web: null
		},

		toString: function() {
			return '[Process:' + this.pid + ']';
		},

		read: function() {
			return this.inputStream.read();
		},

		write: function(output, target) {
			var ostream;

			if (typeof target === 'OutputStream')
				ostream = target;
			else if(target === 'STDOUT') 
				ostream = this.outputStream.std;
			else if(target === 'STDERR') 
				ostream = this.outputStream.err;
			else if(target === 'STDWEB') 
				ostream = this.outputStream.web;
			else {
				console.error(this.toString + ' Method write(): The target is not a valid stream');
				return;
			}

			ostream.write(output);
		},

		exit: function(value) {
			this.events.emit('exit', value || '0');
		},

		info: function(content) {
			this.events.emit('done', content);
		},

		/**
		 * Execute the command in the process context. That is 
		 * calls the function passed as a parametes with this process
		 * as scope.
		 */
		exec: function(command, args) {
			if(typeof command !== 'function') {
				console.error(this.toString + ': Could not execute process because the given command is not a function');
				this.exit(1);
			}

			command.apply(this, args);
		}
	};

	return Process;
	
});