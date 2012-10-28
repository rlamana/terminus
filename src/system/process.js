/**
 * Copyright © 2012 Ramón Lamana
 */
 define(function(require) {
	
	'use strict';

	var Process;
	var Events = require('core/events');
	var Promise = require('core/promise');

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
	Process = function(streams) {
		this.pid = ProcessTable.register(this);
		this.events = new Events;
		this.streams = streams;

		this._promise = new Promise();
	};

	Process.prototype = {
		pid: null,

		_promise: null,

		toString: function() {
			return '[Process:' + this.pid + ']';
		},

		read: function() {
			return this.inputStream.read();
		},

		write: function(output, target) {
			var ostream;

			target = target || 'STDOUT';

			if (typeof target === 'OutputStream')
				ostream = target;
			else if(target === 'STDOUT') 
				ostream = this.streams.stdout;
			else if(target === 'STDERR') 
				ostream = this.streams.err;
			else if(target === 'WEB') 
				ostream = this.streams.web;
			else {
				console.error(this.toString + ' Method write(): The target is not a valid stream');
				return;
			}

			ostream.write(output);
		},

		exit: function(value) {
			this._promise.done();
		},

		/**
		 * Execute the command in the process context. That is 
		 * calls the function passed as a parametes with this process
		 * as scope.
		 */
		exec: function(command, args) {
			var promise = new Promise();

			if(typeof command !== 'function') {
				console.error(this.toString + ': Could not execute process because the given command is not a function');
				this.exit(1);
			}

			command.apply(this, args);
			return this._promise;
		}
	};

	return Process;
	
});
