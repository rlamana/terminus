/**
 * Terminus.js example commands
 * Copyright © 2012 Ramón Lamana
 */
(function(global) {

	'use strict';

	var TestCommands = {
		block: function() {

			setTimeout.call(this, function(){
				this.write('Process has finished');
				this.exit();
			}, 3000);
			
		},

		exit: function() {
			location.reload();
		},

		sum: function(op1, op2) {
			if(arguments.length < 2)
				this.write('Please insert two numeric values (ex. > sum 5 6)', 'stderr');
			else
				this.write(parseInt(op1) + parseInt(op2));

			this.exit();
		},

		hi: function() {
			var self = this;

			this.write('What\'s your name?');
			this.read().then(function(data){
				self.write("Hello " + data + "!!!");
				self.exit(0);
			});
		},

		echo: function(str) {
			this.write(str);
			this.exit(0);
		},

		read: function() {
			var self = this;
			this.read().then(function(data){
				self.write("Response: " + data);
				self.exit(0);
			});
		}

	};

	global.TestCommands = TestCommands;

})( this );