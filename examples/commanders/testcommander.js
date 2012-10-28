/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global, Terminus) {

	'use strict';

	var TestCommander = {
		block: function() {
			this.exit();
		},

		exit: function() {
			location.reload();
		},

		sum: function(op1, op2) {
			this.write(parseInt(op1) + parseInt(op2));
			this.exit();
		},

		test: function() {
			this.write("<div style='color:blue'>Hola mundo</div>", 'WEB');
			this.exit(0);
		},

		test2: function() {
			this.write("It works");
			this.exit(0);
		}
	};

	global.TestCommander = TestCommander;

})( window, window.Terminus );