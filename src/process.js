/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {
	
	'use strict';

	/**
	 * @private
	 */
	var ProcessTable = {
		list: [],

		register: function(process) {
			if(!(process instanceof global.Process))
				console.error('Trying to register a non Process object');

			this.list.push(process);
			return this.list.length - 1;
		}
	};

	/**
	 * @class
	 */
	var Process = function(input, outputStd, outputErr, outputWeb) {
		this.pid = ProcessTable.register(this);
		this.events = new global.Events;

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
	
})( window );