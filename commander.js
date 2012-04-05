
(function(global) {
	var Commander = function() {
		this.events = new global.Events;
	};

	Commander.prototype = {		
		/**
		 * This will fire an event and send output to all the 
		 * terminals listening
		 */
		stdout: function(output) {
			this.events.emit('output', output ? output : '');
		},

		commands: {
		}
	};

	global.Commander = Commander;
})
( window );