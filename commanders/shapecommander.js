/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {

	'use strict';

	var ShapeCommander = function(decorator) {
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

	ShapeCommander.prototype = new global.Commander();

	ShapeCommander.prototype.commands = {
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

		shape: function(n1, n2, n3, n4) {
			var id = 'supertag_' + Math.floor(Math.random()*10e7);
			this.output('<div id="'+id+'" />','WEB');

			var image = new Supertags.Image(300, 300, {
				n1: n1 ? n1 : 5,
				n2: n2 ? n2 : 10,
				n3: n3 ? n3 : 15,
				n4: n4 ? n4 : 15
			});
			image.appendTo(document.getElementById(id));
			image.animate();
			this.done();
		}
	};

	global.ShapeCommander = ShapeCommander;

})( window );