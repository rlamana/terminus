/**
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {
	
	'use strict';

	/**
	 * @class
	 */
	var Terminus = function() {
	};
	
	Terminus.Shell = require('system/shell');
	Terminus.Process = require('system/process');
	Terminus.Commander = require('commander');
	Terminus.Terminal = require('ui/terminal');
	//Terminus.Terminal = Terminal;

	return Terminus;

});
