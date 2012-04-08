/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {

	'use strict';

	var FileCommander = function(decorator) {
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

	FileCommander.prototype = new global.Commander();

	FileCommander.prototype.commands = {
		ls: function() {
			var browse, output = '';
			var icon = function(type, name) {
				var output, image = type==='dir' ? 'images/folder.png' : 'images/file.png';
				output = '<div style="display: inline-block; margin-left: 20px; clear: both;">';
				output += 	'<img src="'+image+'" style="padding-right: 5px; width:18px; height:18px; float: left;" />';
				output += 	'<div style="padding-top:2px; float: right">'+name+'</div>'
				output += '</div>'
				return output;
			};

			for(var i=this.data.browse.length; i--;)
				output += icon(this.data.browse[i][0],this.data.browse[i][1]);

			this.output(output, 'WEB');
			this.done();
		},

		ll: function() {
			var browse, output = '';
			var icon = function(type, name) {
				var output, image = type==='dir' ? 'images/folder.png' : 'images/file.png';
				output = '<div style="display: block; margin-left: 20px; clear: both;">';
				output += 	'<img src="'+image+'" style="padding-right: 5px; width:18px; height:18px; float: left;" />';
				output += 	'<div style="padding-top:2px">'+name+'</div>'
				output += '</div>'
				return output;
			};

			for(var i=this.data.browse.length; i--;)
				output += icon(this.data.browse[i][0],this.data.browse[i][1]);

			this.output(output, 'WEB');
			this.done();
		},

		wget: function(url) {
			this.output("Not implemented yet.");
			this.done();
		},
	};

	global.FileCommander = FileCommander;

})( window );