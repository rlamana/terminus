/**
 * Copyright © 2012 Ramón Lamana
 */
 define(function(require) {

	'use strict';

	var Styles = require('styles');

	var transitionTime = .2;

	// Class to support cross box model
	Styles.addRule('.terminaljs-box', "\
		display: -webkit-box; \
		display: -moz-box; \
		display: -o-box; \
		display: -ms-box; \
		display: box; \
	");

	// Default stylesheet rules for input and output elements
	Styles.addRule('.terminaljs-input-line', {
		'display': 'none',
		'clear': 'both',
		'-webkit-box-orient': 'horizontal',
		'-moz-box-orient': 'horizontal',
		'-ms-box-orient': 'horizontal',
		'-o-box-orient': 'horizontal',
		'box-orient': 'horizontal'
	});

	Styles.addRule('.terminaljs-input', {
		'display': 'block',
		'outline': 'none',
		'-webkit-box-flex': '1',
		'-moz-box-flex': '1',
		'-ms-box-flex': '1',
		'-o-box-flex': '1',
		'box-flex': '1'
	});

	Styles.addRule('.terminaljs .terminaljs-prompt', {
		'margin-right': '5px'
	});

	Styles.addRule('.terminaljs-output', {
		'clear': 'both'
	});

	Styles.addRule('.terminaljs-output .terminaljs-output-line', {
		'height': '0',
		'overflow': 'hidden'
	});

	Styles.addRule('.terminaljs-output .terminaljs-output-line.animate', {
		'-webkit-transition': 'height '+transitionTime+'s ease-in-out',
		'-moz-transition': 'height '+transitionTime+'s ease-in-out',
		'-ms-transition': 'height '+transitionTime+'s ease-in-out',
		'-o-transition': 'height '+transitionTime+'s ease-in-out',
		'transition': 'height '+transitionTime+'s ease-in-out'
	});

	Styles.addRule('.terminaljs-output .terminaljs-output-line.terminaljs-userinput', {
		'-webkit-transition': 'none !important',
		'-moz-transition': 'none !important',
		'-ms-transition': 'none !important',
		'-o-transition': 'none !important',
		'transition': 'none !important'
	});

	/**
	 * Client Object with client configuration
	 * @singleton
	 */
	var Client = {
		animations: true
	};

	return Client;
});
