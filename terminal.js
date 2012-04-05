(function(global) {
	var Terminal = function(shell, area) {
		var self = this;

		this.shell = shell;
		this.area = area;

		area.value = "Terminal.js 0.1\nCopyright Ramon Lamana 2012.\n"

		this._historyIndex = 0;

		area.focus();

		area.addEventListener('keyup', function(e){
			if(e.keyCode == '13'){
				var event = document.createEvent("UIEvents");
				event.initEvent('enter', true, true);
				area.dispatchEvent(event);

				e.preventDefault();
				e.stopPropagation();
			}
		});

		area.addEventListener('mousedown', function(e){
			e.preventDefault();
			e.stopPropagation();
		});

		area.addEventListener('click', function(e){
			e.preventDefault();
			e.stopPropagation();

			area.focus();
		});

		area.addEventListener('keydown', function(e){
			if (e.keyCode == '38') {
				self.historyUp();

				e.preventDefault();
				e.stopPropagation();
			}
			else if (e.keyCode == '40') {
				self.historyDown();

				e.preventDefault();
				e.stopPropagation();
			}
		});

		area.addEventListener('enter', function(e) {
			self.listeners.enter.apply(self, arguments);
		});

		shell.events.on('output', self.listeners.output, this);

		this.prompt();
	}

	Terminal.prototype = {
		historyReset: function() {
			this._historyIndex = this.shell.history.length;
		},

		historyUp: function() {
			this._historyIndex--;
			var command = this.shell.history[this._historyIndex];

			if (command) {
				this._clearLine();
				this.prompt(command);
			} else {
				this._historyIndex = 0;
			}
		},

		historyDown: function() {
			this._historyIndex++;
			var command = this.shell.history[this._historyIndex];

			if (command) {
				this._clearLine();
				this.prompt(command);
			} else {
				this.historyReset();
			}
		},

		prompt: function() {
			this.area.value += '\n' + this.shell.getPrompt() + ' ' + ((arguments.length > 0) ? arguments[0] : '');
		},

		print: function(output) {
			this.area.value += output;
		},

		clear: function() {
			this.area.value = '';
			this.prompt();
		},

		_clearLine: function() {
			this.area.value = this.area.value.replace(/\n(.*)$/i, '');
		},

		listeners: {
			enter: function() {
				var command, line = /\n(.*)\n$/i.exec(this.area.value);//, command = />\s(.*)\n$/i.exec(this.area.value);
				line = (line !== null) ? line[1] : "";
				command = line.replace(new RegExp('^'+this.shell.getEnv('prompt')),'');
				command = command.replace(/^\s+|\s+$/g,"");

				if (command !== null && command !== '') {

					if(command === 'clear') {
						this.clear();
						return;
					}

					console.log('-- Exec "'+command+'"');
					// Execute command
					this.shell.exec(command);
				} else {
					this.prompt();
				}

				this.historyReset();
			},

			output: function (output) {
				this.print(output);
				this.prompt();
			}
		}
	}

	global.Terminal = Terminal;

})
( window );
