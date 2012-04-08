/**
 * Copyright © 2012 Ramón Lamana
 */
 
(function(global) {
	
	'use strict';

	var Util = {
		String: {
			htmlEntities: function (str) {
				return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
			},

			htmlStrip: function (str) {
				return String(str).replace(/&/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
			},
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