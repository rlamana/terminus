/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global, Terminus) {

	'use strict';

	var TestCommander = function(decorator) {
		Terminus.Commander.apply(this);
	}

	TestCommander.prototype = new Terminus.Commander();

	TestCommander.prototype.commands = {
		block: function() {
			this.output('This will block the terminal until read() is called. Test CTRL+Z...');
		},

		exit: function() {
			location.reload();
		}
	};

	global.TestCommander = TestCommander;

})( window, window.Terminus );