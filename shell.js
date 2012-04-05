
(function(global) {
	var Shell = function(commander) {
		this._environment = {
			prompt: '>'
		};

		this.history = [];
		this.events = new global.Events;

		this.setCommander(commander);
	};

	Shell.prototype = {
		history: null,

		_environment: null,
		_commander: null,

		getEnv: function(key) {
			return this._environment[key] ? this._environment[key] : null;
		},

		getPrompt: function() {
			if(this._commander && this._commander.pwd)
				return this._commander.pwd.getBasePath() + this._environment['prompt'];
			else 
				return this._environment['prompt'];
		},

		exec: function(input) {
			var func, args = input.split(' ');
			var command = args[0];
			args.shift();

			this.history.push(input);

			if (this.native[command]) {
				this.native[command].apply(this, args);
			}
			else if (this._commander.commands[command]) {
				this._commander.commands[command].apply(this._commander, args); // Call commanders command, always with the scope of the commander itself
			} else {
				this.stdout("Command '"+command+"' not found.");
			}
		},

		setCommander: function(commander) {
			this._commander = commander; 
			this._commander.events.on('output', this.stdout, this);
		},

		/**
		 * This will fire an event and send output to the 
		 * terminals listening
		 */
		stdout: function(output) {
			this.events.emit('output', output);
		},

		native: {
			history: function() {
				var output = '';
				for(var i=0, l=this.history.length; i<l; i++)
					output += ' ' + i + ': ' + this.history[i] + '\n';

				this.stdout(output);
			}
		}
	};

	global.Shell = Shell;
})
( window );




