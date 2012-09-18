/**
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {
	
	'use strict';

	var Shell = require('terminus/shell');
	var Commander = require('terminus/commander');
	// var Terminal = require('terminus/terminal');
	
	/**
	 * @class
	 */
	var Terminus = function() {
	};

	
	Terminus.Shell = Shell;
	//Terminus.Commander = Commander;
	//Terminus.Terminal = Terminal;

	return Terminus;

});
