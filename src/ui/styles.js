/**
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {
	
	'use strict';

	var Util = require('core/util');
	var Styles = Util.Styles;

	var transitionTime = .2;

	Styles.addRule('.terminusjs', {
		'color': '#fff',
		'background-color': '#111',
		'font-family': 'monospace'
	});

	// Class to support cross-browser flexible box (specs 2009 and 2012)
	Styles.addRule('.terminusjs-box', "\
		display: -webkit-box; \
		display: -moz-box; \
		display: -o-box; \
		display: -ms-box; \
		display: -webkit-flex; \
		display: -moz-flex; \
		display: -o-flex; \
		display: -ms-flex; \
		display: flex; \
	");

	// Default stylesheet rules for input and output elements
	Styles.addRule('.terminusjs-input-line', {
		'display': 'none',
		'clear': 'both',
		'-webkit-box-orient': 'horizontal',
		'-moz-box-orient': 'horizontal',
		'-ms-box-orient': 'horizontal',
		'-o-box-orient': 'horizontal',

		'-webkit-flex-flow': 'row',
		'-moz-flex-flow': 'row',
		'-ms-flex-flow': 'row',
		'-o-flex-flow': 'row',
		'flex-flow': 'row'
	});

	Styles.addRule('.terminusjs-input', {
		'display': 'block',
		'outline': 'none',
		'-webkit-box-flex': '1',
		'-moz-box-flex': '1',
		'-ms-box-flex': '1',
		'-o-box-flex': '1',

		'-webkit-flex': '1',
		'-moz-flex': '1',
		'-ms-flex': '1',
		'-o-flex': '1',
		'flex': '1'
	});

	Styles.addRule('.terminusjs .terminusjs-prompt', {
		'margin-right': '5px'
	});

	Styles.addRule('.terminusjs-output', {
		'clear': 'both'
	});

	Styles.addRule('.terminusjs-output .terminusjs-output-line', {
		'height': '0',
		'overflow': 'hidden'
	});

	Styles.addRule('.terminusjs-output .terminusjs-output-line.animate', {
		'-webkit-transition': 'height '+transitionTime+'s ease-in-out',
		'-moz-transition': 'height '+transitionTime+'s ease-in-out',
		'-ms-transition': 'height '+transitionTime+'s ease-in-out',
		'-o-transition': 'height '+transitionTime+'s ease-in-out',
		'transition': 'height '+transitionTime+'s ease-in-out'
	});

	Styles.addRule('.terminusjs-output .terminusjs-output-line.terminusjs-userinput', {
		'-webkit-transition': 'none !important',
		'-moz-transition': 'none !important',
		'-ms-transition': 'none !important',
		'-o-transition': 'none !important',
		'transition': 'none !important'
	});

});
