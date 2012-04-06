/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {

	'use strict';

	var TestCommander = function(decorator) {
		global.Commander.apply(this);
	};

	TestCommander.prototype = new global.Commander();

	TestCommander.prototype.commands = {
		pwd: function() {
			this.output(' executing command...');	
		},

		rm: function() {
			this.output(' estandar out: <b>caca</b>');
			this.output(' estandar err: <b>caca</b>', 'STDERR');
			this.output(' estandar web: <b>caca</b>', 'WEB');
			this.done();
		}
	};

	global.TestCommander = TestCommander;

})( window );