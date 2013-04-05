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
				this.write(parseInt(op1,10) + parseInt(op2,10));

			this.exit();
		},

		hi: function() {
			var self = this;

			this.write('What\'s your name?', 'stderr');
			this.read().then(function(data){
				self.write('Hello ' + data + '!!!');
				self.exit(0);
			});
		},

		echo: function() {
			var args = Array.prototype.slice.call(arguments, 0);
			this.write(args.join(' '));

			this.exit(0);
		},

		read: function() {
			var self = this;
			this.read().then(function(data){
				self.write(data);
				self.exit(0);
			});
		}
	};

	global.TestCommands = TestCommands;

})(this);