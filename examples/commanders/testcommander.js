/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global, Terminal) {

	'use strict';

	var TestCommander = function(decorator) {
		Terminal.Commander.apply(this);
	}

	TestCommander.prototype = new Terminal.Commander();

	TestCommander.prototype.commands = {
		block: function() {
			this.output('This will block the terminal until read() is called. Test CTRL+Z...');
		},

		exit: function() {
			location.reload();
		}
	};

	global.TestCommander = TestCommander;

})( window, window.Terminal );