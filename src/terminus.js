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

	Terminus.prototype = {
	};
	
	Terminus.version = '0.4';

	Terminus.Display = require('ui/display');
	Terminus.Shell 	 = require('system/shell');
	Terminus.Process = require('system/process');

	return Terminus;
});
