(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Terminus"] = factory();
	else
		root["Terminus"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./terminus.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/less-loader/dist/cjs.js?!./ui/css/display.less":
/*!*********************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader!../node_modules/postcss-loader/lib!../node_modules/less-loader/dist/cjs.js??ref--6-3!./ui/css/display.less ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * Terminus.js\n * Copyright © 2012 Ramón Lamana\n */\n.terminusjs {\n  color: #fff;\n  background-color: #000;\n  font-family: monospace;\n  /* Class to support cross-browser flexible box (specs 2009 and 2012) */\n  /* Default stylesheet rules for input and output elements */\n}\n.terminusjs .terminusjs-box {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -o-box;\n  display: -ms-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -o-flex;\n  display: -ms-flex;\n  display: flex;\n}\n.terminusjs .terminusjs-box.hidden {\n  display: none;\n}\n.terminusjs .terminusjs-prompt {\n  clear: both;\n  -webkit-box-orient: horizontal;\n  -moz-box-orient: horizontal;\n  -ms-box-orient: horizontal;\n  -o-box-orient: horizontal;\n  -webkit-flex-flow: row;\n  -moz-flex-flow: row;\n  -o-flex-flow: row;\n  flex-flow: row;\n}\n.terminusjs .terminusjs-input {\n  display: block;\n  outline: none;\n  -webkit-box-flex: 1;\n  -moz-box-flex: 1;\n  -ms-box-flex: 1;\n  -o-box-flex: 1;\n  -webkit-flex: 1;\n  -moz-flex: 1;\n  -o-flex: 1;\n  flex: 1;\n}\n.terminusjs .terminusjs-ps {\n  margin-right: 5px;\n}\n.terminusjs .terminusjs-output {\n  clear: both;\n}\n.terminusjs .terminusjs-output .terminusjs-output-line {\n  height: 0;\n  overflow: hidden;\n}\n.terminusjs .terminusjs-output .terminusjs-output-line.animate {\n  -webkit-transition: height 0.2s ease-in-out;\n  transition: height 0.2s ease-in-out;\n}\n.terminusjs .terminusjs-output .terminusjs-output-line.terminusjs-userinput {\n  -webkit-transition: none !important;\n  transition: none !important;\n}\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/lib/css-base.js":
/*!**************************************************!*\
  !*** ../node_modules/css-loader/lib/css-base.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../node_modules/style-loader/lib/addStyles.js":
/*!*****************************************************!*\
  !*** ../node_modules/style-loader/lib/addStyles.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../node_modules/style-loader/lib/urls.js":
/*!************************************************!*\
  !*** ../node_modules/style-loader/lib/urls.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./core/events.js":
/*!************************!*\
  !*** ./core/events.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
	'use strict';

	/**
  * @class
  */

	var Events = function Events() {
		this.__listeners = {};
	};

	Events.prototype = {
		on: function on(eventName, listener, scope) {
			if (!this.__listeners[eventName]) this.__listeners[eventName] = [];

			if (!listener) console.error('events.on(): The listener doesn\'t exist');

			this.__listeners[eventName].push(listener.bind(scope ? scope : this));
		},

		emit: function emit() {
			var eventName,
			    data = Array.prototype.slice.call(arguments);

			if (arguments.length === 0) console.error('Events.emit(): Incorrect number of parameters');

			eventName = arguments[0];
			if (!this.__listeners[eventName]) return;

			data.shift();
			for (var i = this.__listeners[eventName].length; i--;) {
				this.__listeners[eventName][i].apply(null, data);
			} // Listeners have been binded
		}
	};

	return Events;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./core/promise.js":
/*!*************************!*\
  !*** ./core/promise.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * jsBase
 * Copyright © 2009-2012 A. Matías Quezada
 * https://github.com/amatiasq
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	'use strict';

	var slice = Array.prototype.slice;

	function Promise() {
		this._ondone = [];
		this._onerror = [];
		this._onprogress = [];
		this._state = 'unfulfilled';
		this._args = null;
	}

	Promise.prototype = {
		constructor: Promise,

		done: function done(var_args) {
			if (checkValid(this._state)) {
				this._state = 'fulfilled';
				this._args = slice.call(arguments);
				call(this._ondone, this._args);
			}
		},

		fail: function fail(var_args) {
			if (checkValid(this._state)) {
				this._state = 'failed';
				if (this._onerror.length === 0) throw new Error('Promise failed without handler.');
				this._args = slice.call(arguments);
				call(this._onerror, this._args);
			}
		},

		progress: function progress(var_args) {
			if (this.isCanceled()) return;

			for (var i = 0, len = this._onprogress.length; i < len; i++) {
				this._onprogress[i].apply(null, arguments);
			}
		},

		onDone: function onDone(callback) {
			if (typeof callback == 'function') {
				if (this.isDone()) call(callback, this._args);else this._ondone.push(callback);
			}
			return this;
		},

		onFail: function onFail(callback) {
			if (typeof callback == 'function') {
				if (this.isFailed()) call(callback, this._args);else this._onerror.push(callback);
			}
			return this;
		},

		onProgress: function onProgress(callback) {
			if (typeof callback == 'function') this._onprogress.push(callback);

			return this;
		},

		then: function then(success, fail, progress) {
			this.onDone(success);
			this.onFail(fail);
			this.onProgress(progress);
			return this;
		},

		cancel: function cancel() {
			this._state = 'canceled';
		},

		isCanceled: function isCanceled() {
			return this._state === 'canceled';
		},

		isDone: function isDone() {
			return this._state === 'fulfilled';
		},

		isFailed: function isFailed() {
			return this._state === 'failed';
		},

		isOpen: function isOpen() {
			return this._state === 'unfulfilled';
		}

	};

	function call(callbacks, args) {
		setTimeout(function () {
			if (typeof callbacks === 'function') return callbacks.apply(null, args);

			for (var i = 0, len = callbacks.length; i < len; i++) {
				callbacks[i].apply(null, args);
			}
		}, 0);
	}

	function checkValid(state) {
		switch (state) {
			case 'unfulfilled':
				return true;
			case 'canceled':
				return false;
			case 'fulfilled':
				throw new Error('Promise is done');
			case 'failed':
				throw new Error('Promise is failed');
			default:
				throw new Error('Invalid promise state ' + state);
		}
	}

	if (typeof Base === 'function') Promise = Base.extend(Promise.prototype);

	Promise.done = function () {
		var prom = new Promise();
		prom.done.apply(prom, arguments);
		return prom;
	};
	Promise.failed = function () {
		var prom = new Promise();
		prom.fail.apply(prom, arguments);
		return prom;
	};
	Promise.parallel = function (promises) {
		var promise = new Promise();
		var result = [];
		var done = [];

		if (arguments.length > 1) promises = slice.call(arguments);

		var len = done.length = promises.length;
		if (len === 0) return Promise.done();

		for (var i = 0; i < len; i++) {
			queueParallel(promise, promises[i], i, done, result);
		}return promise;
	};
	Promise.serial = function (callbacks) {
		var promise = new Promise();
		if (arguments.length > 1) callbacks = slice.call(arguments);

		if (callbacks.length === 0) return Promise.done();

		nextSequential(promise, callbacks, 0, []);
		return promise;
	};

	function queueParallel(prom, target, index, done, results) {
		target.then(function () {

			done[index] = true;
			results[index] = slice.call(arguments);

			if (!prom.isOpen()) return;

			for (var i = done.length; i--;) {
				if (!done[i]) return;
			}prom.done.apply(prom, results);
		}, function () {
			if (prom.isOpen()) prom.fail.apply(prom, arguments);
		});
	}

	function nextSequential(prom, callbacks, index, args) {
		if (index === callbacks.length) return prom.done.apply(prom, args);

		var result = callbacks[index].apply(null, args);

		if (!(result instanceof Promise)) {
			nextSecuencial(prom, callbacks, index + 1, [result]);
		} else {
			result.then(function () {
				nextSecuencial(prom, callbacks, index + 1, arguments);
			}, function (args) {
				prom.fail.apply(prom, arguments);
			});
		}
	}

	return Promise;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./core/util.js":
/*!**********************!*\
  !*** ./core/util.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {

	'use strict';

	/**
  * @singleton
  */

	var Util = {
		String: {
			htmlEntities: function htmlEntities(str) {
				return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
			},

			htmlStrip: function htmlStrip(str) {
				return String(str).replace(/&/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
			}
		},

		Array: {
			merge: function merge() /* variable number of arrays */{
				var result = [];
				for (var i = 0; i < arguments.length; i++) {
					var array = arguments[i];
					for (var j = 0; j < array.length; j++) {
						if (result.indexOf(array[j]) === -1) {
							result.push(array[j]);
						}
					}
				}
				return result;
			}
		},

		Styles: {
			hasClass: function hasClass(element, className) {
				return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
			},

			addClass: function addClass(element, className) {
				if (!this.hasClass(element, className)) element.className += ' ' + className;
			},

			removeClass: function removeClass(element, className) {
				if (this.hasClass(element, className)) {
					var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
					element.className = element.className.replace(reg, ' ');
				}
			}
		}
	};

	return Util;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./io/inputstream.js":
/*!***************************!*\
  !*** ./io/inputstream.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	'use strict';

	var Promise = __webpack_require__(/*! core/promise */ "./core/promise.js");
	var Events = __webpack_require__(/*! core/events */ "./core/events.js");

	/**
  * @class
  */
	var InputStream = function InputStream() {
		this.events = new Events();
		this._buffer = [];

		// Default reader function
		this.reader = function (promise) {
			var data = this._buffer.join('');
			this._buffer = [];
			promise.done(data);
		};
	};

	InputStream.prototype = {
		events: null,

		/**
   * @return {Promise}
   */
		read: function read() {
			var promise = new Promise();

			// Call reader function
			this._reader.call(this, promise);
			this.events.emit('read');

			return promise;
		},

		/**
   * Set reader function.
   * This function receives promise.
   *    function(promise){}
   */
		set reader(func) {
			this._reader = func;
		},

		get reader() {
			return this._reader;
		},

		/**
   * Connects an output stream with this input stream
   */
		pipe: function pipe(outputstream) {
			var self = this;
			outputstream.writer = function (data) {
				self._buffer.push(data);
			};

			return this;
		}
	};

	return InputStream;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./io/outputstream.js":
/*!****************************!*\
  !*** ./io/outputstream.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	'use strict';

	var Events = __webpack_require__(/*! core/events */ "./core/events.js");

	/**
  * @class
  */
	var OutputStream = function OutputStream() {
		this.events = new Events();
		this.close = false;

		this._buffer = [];

		// Default writer
		this.writer = function (data) {
			this._buffer.push(data);
		};
	};

	OutputStream.prototype = {
		events: null,

		/**
   * @property {bool} close
   */
		set close(value) {
			// Cannot be reopened
			if (this._close) return;

			if (value === true) this.events.emit('close');

			this._close = !!value;
		},

		get close() {
			return this._close;
		},

		/**
   * Set writer function.
   * The function will receive data to write.
   *    function(data){}
   */
		set writer(func) {
			this._writer = func;
		},

		get writer() {
			return this._writer;
		},

		/**
   * Writes the content of output to the stream.
   * @param {String} output
   */
		write: function write(data) {
			if (this.close) return;

			data += ''; // Stringify output
			this.events.emit('write', data);
			this._writer.call(this, data);
		}
	};

	return OutputStream;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./system/process.js":
/*!***************************!*\
  !*** ./system/process.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	'use strict';

	var _Process;
	var Events = __webpack_require__(/*! core/events */ "./core/events.js");
	var Promise = __webpack_require__(/*! core/promise */ "./core/promise.js");

	var OutputStream = __webpack_require__(/*! io/outputstream */ "./io/outputstream.js");

	/**
  * @private
  */
	var ProcessTable = {
		list: [],

		register: function register(process) {
			if (!(process instanceof _Process)) console.error('Trying to register a non Process object');

			this.list.push(process);
			return this.list.length - 1;
		}
	};

	/**
  * @class
  */
	_Process = function Process(streams) {
		this.pid = ProcessTable.register(this);
		this.events = new Events();
		this.streams = streams;
		this.bus = _Process.bus;

		this._promise = new Promise();
	};

	/**
  * Global process bus
  */
	_Process.bus = new Events();

	_Process.prototype = {
		pid: null,
		bus: null,

		_promise: null,

		toString: function toString() {
			return '[Process:' + this.pid + ']';
		},

		read: function read() {
			return this.streams.stdin.read();
		},

		/**
   * @param {String} output
   * @param {String|OutputStream} target Output stream or the standard output values: 'stdout', 'stderr' or 'web'.
   */
		write: function write(output, target) {
			var ostream;

			target = target || 'stdout';

			if (typeof target === 'string') target = target.toLowerCase();

			if (target instanceof OutputStream) ostream = target;else if (target !== 'stdin') ostream = this.streams[target];

			if (!ostream) {
				console.error(this.toString() + ' Method write(): The target \'' + target + '\' is not a valid stream');
				return;
			}

			ostream.write(output);
		},

		exit: function exit(value) {
			this._promise.done(value);
		},

		/**
   * Execute the command in the process context. That is
   * calls the function passed as a parametes with this process
   * as scope.
   * @return {Promise}
   */
		exec: function exec(command, args) {
			if (typeof command !== 'function') {
				console.error(this.toString + ': Could not execute process ' + 'because the given command is not a function');
				this.exit(1);
			}

			command.apply(this, args);
			return this._promise;
		}
	};

	return _Process;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./system/shell.js":
/*!*************************!*\
  !*** ./system/shell.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	'use strict';

	var Util = __webpack_require__(/*! core/util */ "./core/util.js");
	var Promise = __webpack_require__(/*! core/promise */ "./core/promise.js");

	var Process = __webpack_require__(/*! system/process */ "./system/process.js");
	var InputStream = __webpack_require__(/*! io/inputstream */ "./io/inputstream.js");
	var OutputStream = __webpack_require__(/*! io/outputstream */ "./io/outputstream.js");

	/**
  * @class
  */
	var Shell = function Shell(commands) {
		this._environment = {};

		if (commands) this.include(commands);

		// Create Standard Streams
		this.streams = {
			stdin: new InputStream(),
			stdout: new OutputStream(),
			stderr: new OutputStream(),
			web: new OutputStream()
		};

		// Global process bus
		this.bus = Process.bus;

		// Debug purposes
		this.streams.stdin.id = 'STDIN';
		this.streams.stdout.id = 'STDOUT';

		this.commands = [];
		this.history = [];
	};

	Shell.prototype = {
		commands: null,
		streams: null,
		bus: null,
		history: null,

		_environment: null,

		getEnv: function getEnv(key) {
			return this._environment[key] ? this._environment[key] : null;
		},

		exec: function exec(input) {
			var group,
			    commands,
			    finishQueue = [];

			var streams = {
				stdin: this.streams.stdin,
				stdout: this.streams.stdout,
				stderr: this.streams.stderr,
				web: this.streams.web
			};

			this.history.push(input);

			commands = this._parse(input);
			commands.forEach(function (command, index) {
				var promise, futureinput;

				// Setup processes streams
				if (index < commands.length - 1) {
					streams.stdout = new OutputStream();
					futureinput = new InputStream().pipe(streams.stdout);
				} else {
					streams.stdout = this.streams.stdout;
					futureinput = null;
				}

				promise = function (streams) {
					// Execute first shell native commands
					if (this.native[command.name]) {
						this.native[command.name].apply(this, command.args);
						return Promise.done();
					} else {
						// Search command in commander stack
						for (var i = this.commands.length; i--;) {
							group = this.commands[i];
							if (group[command.name]) {
								var proc = new Process(streams);
								return proc.exec(group[command.name], command.args);
							}
						}
					}

					this.streams.stderr.write('Command \'' + command.name + '\' not found.');
					return Promise.done();
				}.call(this, streams);

				// Setup input stream for next process
				if (futureinput) streams.stdin = futureinput;

				finishQueue.push(promise);
			}, this);

			return Promise.parallel(finishQueue);
		},

		search: function search(key) {
			var found = [],
			    commands = [];

			for (var i = this.commands.length; i--;) {
				commands = Util.Array.merge(commands, Object.keys(this.commands[i]));
			}var regexp = new RegExp('^' + key, 'i');

			// Proposal only for commands not for arguments
			//if(arguments.length <= 1) {
			for (var j = commands.length; j--;) {
				if (regexp.test(commands[j])) {
					found.push(commands[j]);
				}
			}
			//}
			// @todo proposal for arguments asking the commander. Adding else here.

			return found;
		},

		/**
   * Attaches a group of commands
   * @param {Array} List of commands
   */
		include: function include(commands) {
			this.commands = this.commands.concat(commands);
		},

		/**
   * Parse input string to get commands and args
   * @return An array of {command, args} objects
   */
		_parse: function _parse(input) {
			var commands = input.split('|');

			return commands.map(function (command) {
				var args = command.trim().split(' ');
				command = args[0];
				args.shift();
				return {
					name: command,
					args: args
				};
			});
		},

		/**
   * Shell native commands
   */
		native: {
			history: function history() {
				var output = '';
				for (var i = 0, l = this.history.length; i < l; i++) {
					output += ' ' + i + ': ' + this.history[i] + '\n';
				}this.streams.stdout.write(output);
			},

			clear: function clear() {
				this.bus.emit('clear');
			}
		}
	};

	return Shell;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./terminus.js":
/*!*********************!*\
  !*** ./terminus.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
var domready = __webpack_require__(/*! vendor/domready */ "./vendor/domready.js");

/**
 * Helper that creates a terminal with a default display and shell.
 *
 * @param {String|Element} DOM element or selector where display will be rendered
 * @param {Object} displaySettings Optional display parameters
 * @constructor
 */
var Terminus = function Terminus(element, displaySettings) {
	var self = this;

	// Setup shell
	this.shell = displaySettings.shell || new Terminus.Shell();
	if (!this.shell || !(this.shell instanceof Terminus.Shell)) {
		console.error('Terminus.constructor: Provided shell not valid');
		return;
	}
	displaySettings.shell = this.shell;

	// Setup display
	domready(function () {
		element = typeof element === 'string' ? document.querySelector(element) : element;

		self.display = new Terminus.Display(element, displaySettings);
	});
};

Terminus.prototype = {
	/**
  * @property {Terminus.Shell} shell
  * @readonly
  */
	set shell(value) {
		if (!this._shell) this._shell = value;
	},

	get shell() {
		return this._shell;
	},

	/**
  * @property {Terminus.Display} display
  * @readonly
  */
	set display(value) {
		if (!this._display) this._display = value;
	},

	get display() {
		return this._display;
	}
};

Terminus.version = '0.7.0';

Terminus.Display = __webpack_require__(/*! ui/display */ "./ui/display.js");
Terminus.Shell = __webpack_require__(/*! system/shell */ "./system/shell.js");
Terminus.Process = __webpack_require__(/*! system/process */ "./system/process.js");

module.exports = Terminus;

/***/ }),

/***/ "./ui/css/display.less":
/*!*****************************!*\
  !*** ./ui/css/display.less ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/postcss-loader/lib!../../../node_modules/less-loader/dist/cjs.js??ref--6-3!./display.less */ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/less-loader/dist/cjs.js?!./ui/css/display.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./ui/display.js":
/*!***********************!*\
  !*** ./ui/display.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	'use strict';

	var Events = __webpack_require__(/*! core/events */ "./core/events.js");
	var Promise = __webpack_require__(/*! core/promise */ "./core/promise.js");
	var Util = __webpack_require__(/*! core/util */ "./core/util.js");

	var Prompt = __webpack_require__(/*! ui/prompt */ "./ui/prompt.js");
	var Input = __webpack_require__(/*! ui/input */ "./ui/input.js");
	var Output = __webpack_require__(/*! ui/output */ "./ui/output.js");

	__webpack_require__(/*! ./css/display.less */ "./ui/css/display.less");

	/**
  * Widget
  */
	var Display = function Display(element, settings) {
		var self = this;

		// Create the DOM element and append to body
		if (!element) {
			this.$el = document.createElement('div');
			document.body.appendChild(this.$el);
		}

		// Events support
		this.events = new Events();

		// Load settings
		for (var key in settings) {
			if (settings.hasOwnProperty(key)) this.settings[key] = settings[key];
		}

		// Create DOM elements structure
		this.$el = element;
		Util.Styles.addClass(this.$el, 'terminusjs');

		// Create DOM output element
		this.output = new Output();
		this.output.appendTo(this.$el);

		// Create DOM prompt element
		this.prompt = new Prompt({
			editable: true
		});
		this.prompt.appendTo(this.$el).show();

		this.prompt.events.on('enter', this.enter, this);
		this.prompt.events.on('historyBack', this.historyBack, this);
		this.prompt.events.on('historyForward', this.historyForward, this);
		this.prompt.events.on('autocomplete', this.autocomplete, this);
		this.prompt.events.on('focus', function () {
			// When a key event, always scroll to bottom
			//window.scrollTo(0, document.body.scrollHeight);
		}, this);

		this._currentInput = this.prompt.input;

		// CTRL + Z support
		this.$el.addEventListener('keydown', function (e) {
			if (e.ctrlKey && e.keyCode === 90) {
				self.cancel();
			}
		});

		this.output.print(this.settings.welcome, 'web');
		this.showPrompt();

		element.addEventListener('click', function () {
			self.focus();
		});

		if (!!this.settings.shell) this.connectShell(this.settings.shell);

		this._historyIndex = 0;
	};

	Display.prototype = {
		_shell: null,
		_historyIndex: 0,
		_currentInput: null,

		settings: {
			welcome: '<p>Terminus.js<br/>Copyright 2011-2013 Ramón Lamana.</p>'
		},

		focus: function focus() {
			this._currentInput.focus();
		},

		historyReset: function historyReset() {
			this._historyIndex = this._shell.history.length;
		},

		historyBack: function historyBack() {
			this._historyIndex--;
			var command = this._shell.history[this._historyIndex];

			if (command) this.prompt.input.value = command;else this._historyIndex = 0;
		},

		historyForward: function historyForward() {
			this._historyIndex++;
			var command = this._shell.history[this._historyIndex];

			if (command) this.prompt.input.value = command;else this.historyReset();
		},

		showPrompt: function showPrompt(withContent) {
			this.prompt.input.clear();

			if (typeof withContent !== 'undefined') this.prompt.input.value = withContent;

			this.prompt.show();
			this.prompt.input.focus();

			this.events.emit('prompt');
		},

		idle: function idle() {
			this.prompt.hide();
			this.$el.focus();
		},

		cancel: function cancel() {
			this.prompt.show();
			this._currentInput = this.prompt.input;
			this.focus();
		},

		enter: function enter(input) {
			var command = input.value,
			    promise = new Promise(),
			    self = this;

			// Show command entered in output and hide
			// prompt waiting for next read operation
			this._printPrompt();
			this.idle();

			// When promise is done, put back prompt
			promise.then(function () {
				self.showPrompt();
			});

			if (command === '') {
				promise.done();
				return;
			}

			if (!!this._shell) {
				// Execute Command
				this._shell.exec(command).then(function () {
					promise.done();
				});
			}

			this.historyReset();
		},

		autocomplete: function autocomplete(input) {
			var commands = this._shell.search(input.value);

			if (commands.length > 1) {
				this._printPrompt();
				this.output.print(commands.join(' '), 'stdout');
				this.showPrompt(input.value);
			} else if (commands.length === 1) {
				this.showPrompt(commands[0]);
			}
		},

		connectShell: function connectShell(shell) {
			var streams = shell.streams;
			this._shell = shell;

			// Listen to its output streams
			streams.stdout.events.on('write', function (data) {
				this.output.print(data, 'stdout');
			}, this);

			streams.stderr.events.on('write', function (data) {
				this.output.print(data, 'stderr');
			}, this);

			streams.web.events.on('write', function (data) {
				this.output.print(data, 'web');
			}, this);

			// Listen to other events on shell
			this._shell.bus.on('clear', this.output.clear, this.output);

			// Listen to input events
			streams.stdin.reader = this.reader.bind(this);

			this.historyReset();
		},

		reader: function reader(promise) {
			var /*stdin = this._shell.streams.stdin,*/
			input = new Input({
				editable: true
			});

			this._currentInput = input;
			input.appendTo(this.$el).focus();

			input.events.on('enter', function (input) {
				var /*stream = new OutputStream(),*/
				data = input.value;

				promise.done(data);

				// Print out the input data
				this.output.print(data);

				// Restore input to the old prompt
				input.editable = false;
				this.$el.removeChild(input.$el);
				this._currentInput = this.prompt.input;
			}, this);
		},

		_printPrompt: function _printPrompt() {
			var copy = new Prompt();
			copy.ps = this.prompt.ps;
			copy.input.value = this.prompt.input.value;
			copy.show();

			this.output.print(copy.$el.outerHTML, 'web');
		}
	};

	return Display;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./ui/input.js":
/*!*********************!*\
  !*** ./ui/input.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	'use strict';

	var Events = __webpack_require__(/*! core/events */ "./core/events.js");
	var Util = __webpack_require__(/*! core/util */ "./core/util.js");

	/**
  * Client Input class
  * @class
  */
	var Input = function Input(settings) {
		var self = this;

		this.settings = {
			editable: false
		};

		for (var key in settings) {
			if (settings.hasOwnProperty(key)) this.settings[key] = settings[key];
		}

		// Events support
		this.events = new Events();

		// DOM elements structure
		this.$el = document.createElement('div');
		this.$el.className = 'terminusjs-input';
		this.$el.innerHTML = '';

		if (!!this.settings.editable) {
			this.$el.contentEditable = true;
			this.$el.addEventListener('keydown', function (e) {
				switch (e.keyCode) {
					case 13:
						// Enter key
						e.preventDefault();
						e.stopPropagation();
						self.events.emit('enter', self);
						break;
				}
			});
		}
	};

	Input.prototype = {
		get value() {
			var input = this.$el.innerText || this.$el.textContent;
			var value = input ? input.replace(/\n/g, '') : '';
			value = value.replace(/^\s+|\s+$/g, '');
			return value;
		},

		set value(value) {
			this.$el.innerHTML = value;
			this.focus();
			return this;
		},

		set editable(value) {
			value = !!value;
			this.settings.editable = value;
			this.$el.contentEditable = value;
		},

		get editable() {
			return this.settings.editable;
		},

		appendTo: function appendTo(element) {
			element.appendChild(this.$el);
			return this;
		},

		focus: function focus() {
			this.$el.focus();
			this.placeCursorToEnd();

			this.events.emit('focus', this);

			return this;
		},

		clear: function clear() {
			this.value = '';
			return this;
		},

		isVisible: function isVisible() {
			return this.$el.style.display !== 'none' && Util.Styles.hasClass(this.$el, 'terminusjs-box');
		},

		placeCursorToEnd: function placeCursorToEnd() {
			var range, selection;
			if (document.createRange) {
				// Firefox, Chrome, Opera, Safari, IE 9+
				range = document.createRange();
				range.selectNodeContents(this.$el);
				range.collapse(false);
				selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
			}

			return this;
		}
	};

	return Input;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./ui/output.js":
/*!**********************!*\
  !*** ./ui/output.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	'use strict';

	var Util = __webpack_require__(/*! core/util */ "./core/util.js");

	var OutputLine = __webpack_require__(/*! ui/outputline */ "./ui/outputline.js");

	/**
  * Client Output class
  * @class
  */
	var Output = function Output() {
		this.element = document.createElement('div');
		this.element.className = 'terminusjs-output';
	};

	Output.prototype = {
		/**
   * @param {String} target The output target: 'stdout', 'stderr', 'web'.
   * @param {String} content Output content to be printed.
   * @return {ClientOutput} Itself to call in cascade.
   */
		print: function print(content, target) {
			var output;
			target = target || 'stdout';
			switch (target) {
				case 'stdout':
					output = this._print(Util.String.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminusjs-stdout');
					break;
				case 'stderr':
					output = this._print(Util.String.htmlEntities(content).replace(/\n/g, '<br/>'), 'terminusjs-stderr');
					break;
				case 'web':
					output = this._print(content, 'terminusjs-web');
					break;
			}

			output.show();
			return this;
		},

		clear: function clear() {
			this.element.innerHTML = '';
		},

		appendTo: function appendTo(element) {
			element.appendChild(this.element);
			return this;
		},

		_print: function _print(content, className) {
			var outputLine = new OutputLine(className);
			outputLine.appendTo(this.element);
			outputLine.setContent(content);
			return outputLine;
		}
	};

	return Output;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./ui/outputline.js":
/*!**************************!*\
  !*** ./ui/outputline.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	'use strict';

	var Util = __webpack_require__(/*! core/util */ "./core/util.js");

	var animations = false;

	/**
  * Client OutputLine class.
  * Represents a line output element in the whole output stream.
  * @class
  */
	var OutputLine = function OutputLine() {
		var outputContent,
		    outputLine = this.element = document.createElement('div');
		outputLine.className = 'terminusjs-output-line';
		Util.Styles.addClass(outputLine, 'animate');

		outputContent = this.outputContent = document.createElement('div');
		outputContent.className = 'terminusjs-output-content';
		outputLine.appendChild(outputContent);

		// When new output is generated, always scroll to bottom
		window.scrollTo(0, document.body.scrollHeight);
	};

	OutputLine.prototype = {
		element: null,
		outputContent: null,

		appendTo: function appendTo(element) {
			element.appendChild(this.element);
			return this;
		},

		setContent: function setContent(content) {
			this.outputContent.innerHTML = content;
		},

		show: function show() {
			var self = this;

			var func = function func() {
				Util.Styles.addClass(self.element, 'visible');
				self.element.style.height = animations ? self.outputContent.clientHeight + 'px' : 'auto';
			};

			if (animations) setTimeout(func, 30);else func.call(this);
		},

		hide: function hide() {
			Util.Styles.removeClass(this.element, 'visible');
			this.element.style.height = '0';
		}
	};

	return OutputLine;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./ui/prompt.js":
/*!**********************!*\
  !*** ./ui/prompt.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function (require) {

	'use strict';

	var Events = __webpack_require__(/*! core/events */ "./core/events.js");
	var Util = __webpack_require__(/*! core/util */ "./core/util.js");

	var Input = __webpack_require__(/*! ui/input */ "./ui/input.js");

	/**
  * Prompt input class
  * @class
  */
	var Prompt = function Prompt(settings) {
		var self = this;

		this.settings = {
			editable: false,
			ps: '>'
		};

		for (var key in settings) {
			if (settings.hasOwnProperty(key)) {
				this.settings[key] = settings[key];
			}
		}

		// Events support
		this.events = new Events();

		// DOM elements structure
		this.$el = document.createElement('div');
		this.$el.className = 'terminusjs-prompt';
		this.$el.className += ' terminusjs-box';

		this.$ps = document.createElement('div');
		this.$ps.className = 'terminusjs-ps';
		this.$el.appendChild(this.$ps);

		// Input element
		this.input = new Input(settings);
		this.input.appendTo(this.$el);

		if (!!this.settings.editable) {
			this.input.$el.addEventListener('keydown', function (e) {
				switch (e.keyCode) {
					case 13:
						// Enter key
						e.preventDefault();
						e.stopPropagation();
						self.events.emit('enter', self.input);
						break;

					case 38:
						// Up key
						self.events.emit('historyBack', self.input);

						e.preventDefault();
						e.stopPropagation();
						break;

					case 40:
						// Down key
						self.events.emit('historyForward', self.input);

						e.preventDefault();
						e.stopPropagation();
						break;

					case 9:
						// Tab key
						self.events.emit('autocomplete', self.input);

						e.preventDefault();
						e.stopPropagation();
						break;
				}
			});
		}

		this.ps = this.settings.ps;
	};

	Prompt.prototype = {
		set ps(value) {
			this.settings.prompt = value;
			this.$ps.innerHTML = value;
			return this;
		},

		get ps() {
			return this.settings.prompt;
		},

		appendTo: function appendTo(element) {
			element.appendChild(this.$el);
			return this;
		},

		show: function show() {
			Util.Styles.removeClass(this.$el, 'hidden');
			return this;
		},

		hide: function hide() {
			Util.Styles.addClass(this.$el, 'hidden');
			return this;
		},

		isVisible: function isVisible() {
			return this.$el.style.display !== 'none' && Util.Styles.hasClass(this.$el, 'terminusjs-box');
		}
	};

	return Prompt;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./vendor/domready.js":
/*!****************************!*\
  !*** ./vendor/domready.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (true) module.exports = definition();else {}
}('domready', function (ready) {

  var fns = [],
      _fn2,
      f = false,
      doc = document,
      testEl = doc.documentElement,
      hack = testEl.doScroll,
      domContentLoaded = 'DOMContentLoaded',
      addEventListener = 'addEventListener',
      onreadystatechange = 'onreadystatechange',
      readyState = 'readyState',
      loaded = /^loade|c/.test(doc[readyState]);

  function flush(f) {
    loaded = 1;
    while (f = fns.shift()) {
      f();
    }
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, _fn2 = function fn() {
    doc.removeEventListener(domContentLoaded, _fn2, f);
    flush();
  }, f);

  hack && doc.attachEvent(onreadystatechange, _fn2 = function _fn() {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, _fn2);
      flush();
    }
  });

  return ready = hack ? function (fn) {
    self != top ? loaded ? fn() : fns.push(fn) : function () {
      try {
        testEl.doScroll('left');
      } catch (e) {
        return setTimeout(function () {
          ready(fn);
        }, 50);
      }
      fn();
    }();
  } : function (fn) {
    loaded ? fn() : fns.push(fn);
  };
});

/***/ })

/******/ });
});
//# sourceMappingURL=terminus.js.map