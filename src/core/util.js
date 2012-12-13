/**
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {
	
	'use strict';

	/**
	 * @singleton
	 */
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
		},

		Styles: {
			_styleSheet: null,

			addRule: function (selector, declaration) {  
				var declarationStr = declaration;

				// Create stylesheet if it doesn't exist
				if(!this._styleSheet) {
					var style = document.createElement('style');

					if(!document.head)
						return;

					document.head.insertBefore(style, document.head.childNodes[0]); // Before all other defined styles
					this._styleSheet = document.styleSheets[document.styleSheets.length - 1];
				}

				if (typeof declaration !== 'string') {
					declarationStr = ''
					
					for(var style in declaration) {
						if(!declaration.hasOwnProperty(style))
							continue;

						declarationStr += style + ': ' + declaration[style] + ';';
					}
		  		}

				this._styleSheet.insertRule(selector + '{' + declarationStr + '}', 0);  
			},  

			hasClass: function (element, className) {
				return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
			},

			addClass: function(element, className) {
				if (!this.hasClass(element, className)) 
					element.className += " " + className;
			},

			removeClass: function(element, className) {
				if (this.hasClass(element, className)) {
					var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
					element.className = element.className.replace(reg,' ');
				}
			}
		}
	};

	return Util;
});