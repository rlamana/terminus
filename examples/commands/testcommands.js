/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {

	'use strict';

	var TestCommands = {
		block: function() {
			this.exit();
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

		read: function() {
			var self = this;

			this.write('¿Cómo te llamas?');
			this.read().then(function(data){
				self.write("Hola " + data + "!!!!!");
				self.exit(0);
			});
		}

	};

	global.TestCommands = TestCommands;

})( this );