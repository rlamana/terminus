/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {

	'use strict';

	var Process;
	var Events = require('core/events');
	var Promise = require('core/promise');

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
	Process = function(streams) {
		this.pid = ProcessTable.register(this);
		this.events = new Events;
		this.streams = streams;
		this.bus = Process.bus;

		this._promise = new Promise();
	};

	/**
	 * Global process bus
	 */
	Process.bus = new Events;

	Process.prototype = {
		pid: null,
		bus: null,

		_promise: null,

		toString: function() {
			return '[Process:' + this.pid + ']';
		},

		read: function() {
			return this.streams.stdin.read();
		},

		/**
		 * @param {String} output
		 * @param {String|OutputStream} target Output stream or the standard output values: 'stdout', 'stderr' or 'web'.
		 */
		write: function(output, target) {
			var ostream;

			target = target || 'stdout';

			if (typeof target === 'string')
				target = target.toLowerCase();

			if(target instanceof OutputStream)
				ostream = target;
			else if(target !== 'stdin')
				ostream = this.streams[target];

			if(!ostream) {
				console.error(this.toString() + ' Method write(): The target \''+ target +'\' is not a valid stream');
				return;
			}

			ostream.write(output);
		},

		exit: function(value) {
			this._promise.done(value);
		},

		/**
		 * Execute the command in the process context. That is
		 * calls the function passed as a parametes with this process
		 * as scope.
		 * @return {Promise}
		 */
		exec: function(command, args) {
			if(typeof command !== 'function') {
				console.error(this.toString + ': Could not execute process ' +
					'because the given command is not a function');
				this.exit(1);
			}

			command.apply(this, args);
			return this._promise;
		}
	};

	return Process;

});
