/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {
	
	'use strict';

	var Util = {
		htmlEntities: function (str) {
			return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		},

		htmlStrip: function (str) {
			return String(str).replace(/&/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		},

		/* Box Model in CSS3 Support */

		_detectBoxModel: function(element) {
			return typeof element.style.MozBoxFlex !== 'undefined' ? 'moz' : 
				   (typeof element.style.webkitBoxFlex !== 'undefined' ? 'webkit' : null);
		},

		getCrossCss: function(element, property) {
			var nav = this._detectBoxModel(element);
			return (nav) ? '-' + nav + '-' + property : property;
		},

		setCrossStyle: function(element, property, value) {
			var nav = this._detectBoxModel(element);
			var prop = (nav && nav === 'moz') ? (nav[0].toUpperCase() + nav.substr(1) + property[0].toUpperCase() + property.substr(1)) : 
					   (nav ? nav + property : property);
			element.style[prop] = value;
		},

		Array: {
			merge: function(/* variable number of arrays */){
				var result = [];
			    for(var i = 0; i < arguments.length; i++){
			        var array = arguments[i];
			        for(var j = 0; j < array.length; j++){
			            if(result.indexOf(array[j]) === -1) {
			                result.push(array[j]);
			            }
			        }
			    }
			    return result;
			}
		}
	};

	global.Util = Util;
})
( window );