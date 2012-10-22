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
			this.exit();
		},

		exit: function() {
			location.reload();
		},

		sum: function(op1, op2) {
			this.output(parseInt(op1) + parseInt(op2));
			this.done();
		}
	};

	global.TestCommander = TestCommander;

})( window, window.Terminus );

/*
Terminus.addCommands({
	exit: function() {
		location.reload();
	},

	sum: function(op1, op2) {
		this.output(parseInt(op1) + parseInt(op2));
		this.done();
	}
});*/