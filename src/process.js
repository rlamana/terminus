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
	
})( window );