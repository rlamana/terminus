/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {

	'use strict';

	var TestCommander = function(decorator) {
		global.Commander.apply(this);

		this.data = {
			browse: [
				['file', 'list.txt'],
				['file', 'meeting.doc'],
				['dir', 'Images'],
				['dir', 'Documents'],
				['dir', 'Downloads'],
				['dir', 'Music']
			]
		};
	}

	TestCommander.prototype = new global.Commander();

	TestCommander.prototype.commands = {
		ls: function() {
			var browse, output = '';
			var icon = function(type, name) {
				var image = type==='dir' ? 'images/folder.png' : 'images/file.png';
				return '<div style="display: inline-block; margin-left: 20px; clear: both;"><img src="'+image+'" style="margin-left: 3px; width:20px; height:20px; float: left;" />'+name+'</div>'
			};

			for(var i=this.data.browse.length; i--;)
				output += icon(this.data.browse[i][0],this.data.browse[i][1]);

			this.output(output, 'WEB');
			this.done();
		},

		ll: function() {
			var browse, output = '';
			var icon = function(type, name) {
				var image = type==='dir' ? 'images/folder.png' : 'images/file.png';
				return '<div style="display: block; margin-left: 20px; clear: both;"><img src="'+image+'" style="margin-left: 3px; width:20px; height:20px; float: left;" />'+name+'</div>'
			};

			for(var i=this.data.browse.length; i--;)
				output += icon(this.data.browse[i][0],this.data.browse[i][1]);

			this.output(output, 'WEB');
			this.done();
		},
		cat: function() {

		}
	};

	global.TestCommander = TestCommander;

})( window );