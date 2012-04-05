(function(global) {

	var TestCommander = function(decorator) {
		global.Commander.apply(this);
	};

	TestCommander.prototype = new global.Commander();

	TestCommander.prototype.commands = {
		pwd: function() {
			this.stdout(' executing command...');	
		},

		rm: function() {
			this.stdout(' executing command...');	
		}
	};

	global.TestCommander = TestCommander;

})( window );