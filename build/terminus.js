(function(exports) {
/**
 * almond 0.1.3 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        aps = [].slice;

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            return true;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (waiting.hasOwnProperty(name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!defined.hasOwnProperty(name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    function makeMap(name, relName) {
        var prefix, plugin,
            index = name.indexOf('!');

        if (index !== -1) {
            prefix = normalize(name.slice(0, index), relName);
            name = name.slice(index + 1);
            plugin = callDep(prefix);

            //Normalize according
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            p: plugin
        };
    }

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = makeRequire(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = defined[name] = {};
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = {
                        id: name,
                        uri: '',
                        exports: defined[name],
                        config: makeConfig(name)
                    };
                } else if (defined.hasOwnProperty(depName) || waiting.hasOwnProperty(depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else if (!defining[depName]) {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 15);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        waiting[name] = [name, deps, callback];
    };

    define.amd = {
        jQuery: true
    };
}());

define("../vendor/almond", function(){});

/**
 * Copyright © 2012 Ramón Lamana
 */
 define('core/events',['require'],function(require) {

 	

	/**
	 * @class
	 */
	var Events = function() {
		this.__listeners = {};
	};

	Events.prototype = {
		on: function(eventName, listener, scope) {
			if(!this.__listeners[eventName])
				this.__listeners[eventName] = [];

			if (!listener)
				console.error('events.on(): The listener doesn\'t exist');

			this.__listeners[eventName].push(listener.bind(scope?scope:this));
		},

		emit: function() {
			var eventName, data = Array.prototype.slice.call(arguments);

			if (arguments.length === 0)
				console.error('Events.emit(): Incorrect number of parameters');

			eventName = arguments[0];
			if(!this.__listeners[eventName])
				return;

			data.shift();
			for(var i=this.__listeners[eventName].length; i--; )
				this.__listeners[eventName][i].apply(null, data); // Listeners have been binded
		}
	};

	return Events;
	
});
/**
 * Copyright © 2009-2012 A. Matías Quezada
 * https://github.com/amatiasq
 */
 define('core/promise',['require'],function(require) {

	

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

		done: function(var_args) {
			if (checkValid(this._state)) {
				this._state = 'fulfilled';
				this._args = slice.call(arguments);
				call(this._ondone, this._args);
			}
		},

		fail: function(var_args) {
			if (checkValid(this._state)) {
				this._state = 'failed';
				if (this._onerror.length === 0)
					throw new Error('Promise failed without handler.');
				this._args = slice.call(arguments);
				call(this._onerror, this._args);
			}
		},

		progress: function(var_args) {
			if (this.isCanceled())
				return;

			for (var i = 0, len = this._onprogress.length; i < len; i++)
				this._onprogress[i].apply(null, arguments);
		},

		onDone: function(callback) {
			if (typeof callback == 'function') {
				if (this.isDone())
					call(callback, this._args);
				else
					this._ondone.push(callback);
			}
			return this;
		},

		onFail: function(callback) {
			if (typeof callback == 'function') {
				if (this.isFailed())
					call(callback, this._args);
				else
					this._onerror.push(callback);
			}
			return this;
		},

		onProgress: function(callback) {
			if (typeof callback == 'function')
				this._onprogress.push(callback);

			return this;
		},

		then: function(success, fail, progress) {
			this.onDone(success);
			this.onFail(fail);
			this.onProgress(progress);
			return this;
		},

		cancel: function() {
			this._state = 'canceled';
		},

		isCanceled: function() {
			return this._state === 'canceled';
		},

		isDone: function() {
			return this._state === 'fulfilled';
		},

		isFailed: function() {
			return this._state === 'failed';
		},

		isOpen: function() {
			return this._state === 'unfulfilled';
		}

	};

	function call(callbacks, args) {
		setTimeout(function() {
			if (typeof callbacks === 'function')
				return callbacks.apply(null, args);

			for (var i = 0, len = callbacks.length; i < len; i++)
				callbacks[i].apply(null, args);
		}, 0);
	}

	function checkValid(state) {
		switch (state) {
			case 'unfulfilled':
				return true;
			case 'canceled':
				return false;
			case 'fulfilled':
				throw new Error('Promise is done')
			case 'failed':
				throw new Error('Promise is failed');
			default:
				throw new Error('Invalid promise state ' + state);
		}
	}

	if (typeof Base === 'function')
		Promise = Base.extend(Promise.prototype);

	Promise.done = function() {
		var prom = new Promise();
		prom.done.apply(prom, arguments);
		return prom;
	};
	Promise.failed = function() {
		var prom = new Promise();
		prom.fail.apply(prom, arguments);
		return prom;
	};
	Promise.parallel = function(promises) {
		var promise = new Promise();
		var result = [];
		var done = [];

		if (arguments.length > 1)
			promises = slice.call(arguments);

		var len = done.length = promises.length;
		if (len === 0)
			return Promise.done();

		for (var i = 0; i < len; i++)
			queueParallel(promise, promises[i], i, done, results);

		return promise;
	};
	Promise.serial = function(callbacks) {
		var promise = new Promise();
		if (arguments.length > 1)
			callbacks = slice.call(arguments);

		if (callbacks.length === 0)
			return Promise.done();

		nextSequential(promise, callbacks, 0, [])
		return promise;
	};

	function queueParallel(prom, target, index, done, results) {
		target.then(function() {

			done[index] = true;
			results[index] = slice.call(arguments);

			if (!prom.isOpen())
				return;

			for (var i = done.length; i--; )
				if (!done[i])
					return;

			prom.done.apply(prom, results);

		}, function() {
			if (prom.isOpen())
				prom.fail.apply(prom, arguments);
		});
	}
	
	function nextSequential(prom, callbacks, index, args) {
		if (index === callbacks.length)
			return prom.done.apply(prom, args);

		var result = callbacks[index].apply(null, args);

		if (!(result instanceof Promise)) {
			nextSecuencial(prom, callbacks, index + 1, [result]);
		} else {
			result.then(function() {
				nextSecuencial(prom, callbacks, index + 1, arguments);
			}, function(args) {
				prom.fail.apply(prom, arguments);
			});
		}
	}

	return Promise;
});
/**
 * Copyright © 2012 Ramón Lamana
 */
define('ui/styles',['require'],function(require) {
	
	

	/**
	 * @singleton
	 */
	var Styles = {
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
	};

	return Styles;
});

/**
 * Copyright © 2012 Ramón Lamana
 */
 
define('io/outputstream',['require','core/promise','core/events'],function(require) {
	
	

	var Promise = require('core/promise');
	var Events = require('core/events');

	/**
	 * @class
	 */
	var OutputStream = function() {
		// Events support
		this.events = new Events();
		
		this.stream = [];
	};

	OutputStream.prototype = {
		write: function(output) {
			this.stream.push(output);
			this.events.emit('data', output);
		}
	};

	return OutputStream;
});
/**
 * Copyright © 2012 Ramón Lamana
 */
 
define('io/inputstream',['require','core/promise','core/events','io/outputstream'],function(require) {
	
	

	/**
	 * @dependecies
	 */
	var Promise = require('core/promise');
	var Events = require('core/events');

	var OutputStream = require('io/outputstream');

	/**
	 * @class
	 *
	 * events: read, data, end
	 */
	var InputStream = function() {
		// Events support
		this.events = new Events();
		this.stream = [];

		this._promise = null;
	};

	InputStream.prototype = {
		read: function() {
			this.events.emit('read');
			this._promise = new Promise();

			return this._promise;
		}, 

		end: function() {
			if(this._promise)
				this._promise.done(this.stream);
		},

		/**
		 * Connects an output stream with an input stream
		 */ 
		pipe: function(outputstream) {
			var self = this;

			if(!outputstream)
				outputstream = new OutputStream();
			
			outputstream.events.on('data', function(input) {
				this.stream.push(input);
				this.events.emit('data', input);
			}, this);

			return outputstream;
		}
	};

	return InputStream;
	
});
/**
 * Copyright © 2012 Ramón Lamana
 */
define('ui/input',['require','core/events','ui/styles','io/inputstream'],function(require) {
	
	

	var Events = require('core/events');
	var Styles = require('ui/styles');
	
	var InputStream = require('io/inputstream');

	/**
	 * Client Input class
	 * @class
	 */
	var Input = function(settings) {
		var self = this;

		this.settings = {
			editable: false,
			prompt: '>'
		};

		for(var key in settings) {
			if (!settings.hasOwnProperty(key))
				continue;
			this.settings[key] = settings[key];
		}

		// Events support
		this.events = new Events();

		// DOM elements structure
		this.element = document.createElement('div');
		
		this.element.className = 'terminusjs-input-line';

		this.prompt = document.createElement('div');
		this.prompt.className = 'terminusjs-prompt';
		this.element.appendChild(this.prompt);

		this.text = document.createElement('div');
		this.text.className = 'terminusjs-input';
		this.text.innerHTML = '';
		this.element.appendChild(this.text);

		if(!!this.settings.editable) {
			this.text.contentEditable = true;
			this.text.addEventListener('keydown', function(e) {
				// When a key event, alway scroll to bottom
				window.scrollTo(0,document.body.scrollHeight);
				switch(e.keyCode) {
					case 13: // Enter key
						e.preventDefault();
						e.stopPropagation();
						self.events.emit('enter', self);
						break;

					case 38: // Up key
						self.events.emit('historyBack', self);

						e.preventDefault();
						e.stopPropagation();
						break;

					case 40: // Down key
						self.events.emit('historyForward', self);

						e.preventDefault();
						e.stopPropagation();
						break;

					case 9: // Tab key
						self.events.emit('autocomplete', self);

						e.preventDefault();
						e.stopPropagation();
						break;
				}
			});
		}

		this.setPrompt(this.settings.prompt);
	};

	Input.prototype = {
		getValue: function () {
			var input = this.text.innerText || this.text.textContent;
			var value = input ? input.replace(/\n/g, '') : '';
			value = value.replace(/^\s+|\s+$/g,"");
			return value;
		},

		setValue: function (value) {
			this.text.innerHTML = value;
			this.placeCursorToEnd();
			return this;
		},

		setEditable: function(value) {
			this.text.contentEditable = value;
		},

		appendTo: function(element) {
			element.appendChild(this.element);
			return this;
		},

		setPrompt: function(prompt) {
			this.settings.prompt = prompt;
			this.prompt.innerHTML = prompt;
			return this;
		},

		getPrompt: function() {
			return this.settings.prompt;
		},

		focus: function () {
			this.text.focus();
			this.placeCursorToEnd();
			return this;
		},

		clear: function() {
			this.setValue('');
			return this;
		},

		show: function () {
			Styles.addClass(this.element,'terminusjs-box');
			return this;
		},

		hide: function () {
			Styles.removeClass(this.element,'terminusjs-box');
			return this;
		},

		isVisible: function() {
			return (this.element.style.display !== 'none') && Styles.hasClass(this.element, 'terminusjs-box');
		},

		placeCursorToEnd: function() {
			var range, selection;
		    if(document.createRange) { // Firefox, Chrome, Opera, Safari, IE 9+
		        range = document.createRange();
		        range.selectNodeContents(this.text);
		        range.collapse(false);
		        selection = window.getSelection();
		        selection.removeAllRanges();
		        selection.addRange(range);
		    } 
		    return this;
		}
	};

	return Input;
});

/**
 * Copyright © 2012 Ramón Lamana
 */
define('core/util',['require'],function(require) {
	
	

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
		}
	};

	return Util;
});
/**
 * Copyright © 2012 Ramón Lamana
 */
define('ui/outputline',['require','ui/styles'],function(require) {
	
	

	var Styles = require('ui/styles');

	/**
	 * Client OutputLine class.
	 * Represents a line output element in the whole output stream.
	 * @class
	 */
	var OutputLine = function(className) {
		var outputContent, outputLine = this.element = document.createElement('div');
		outputLine.className = 'terminusjs-output-line ' + 
			(className || '');/* + 
			(Client.animations ? ' animate' : '');*/

		outputContent = this.outputContent = document.createElement('div');
		outputContent.className = 'terminusjs-output-content';
		outputLine.appendChild(outputContent);

		// When new output is generated, always scroll to bottom
		window.scrollTo(0,document.body.scrollHeight);
		
	};

	OutputLine.prototype = {
		element: null,
		outputContent: null,

		appendTo: function(element) {
			element.appendChild(this.element);
			return this;
		},

		setContent: function(content) {
			this.outputContent.innerHTML = content;
		},

		show: function() {
			var self = this;
			var animations = false; //Client.animations;

			var func = function() {
				Styles.addClass(self.element, 'visible');
				self.element.style.height = animations ? self.outputContent.clientHeight + 'px' : 'auto';
			};

			animations ? setTimeout(func, 30) : func();
		},

		hide: function() {
			Styles.removeClass(this.element, 'visible');
			this.element.style.height = '0';
		}
	};

	return OutputLine;
});
/**
 * Copyright © 2012 Ramón Lamana
 */
define('ui/output',['require','core/events','core/util','ui/outputline'],function(require) {
	
	

	var Events = require('core/events');
	var Util = require('core/util');
	
	var OutputLine = require('ui/outputline');
	
	/**
	 * Client Output class
	 * @class
	 */
	var Output = function() {
		this.element = document.createElement('div');
		this.element.className = 'terminusjs-output';
	};

	Output.prototype = {
		_print: function(content, className) {
			var outputLine = new OutputLine(className);
			outputLine.appendTo(this.element);
			outputLine.setContent(content);
			return outputLine;
		},

		appendTo: function(element) {
			element.appendChild(this.element);
			return this;
		},

		/**
		 * @param {String} target The output target: 'stdout', 'stderr', 'web'.
		 * @param {String} content Output content to be printed.
		 * @return {ClientOutput} Itself to call in cascade.
		 */
		print: function(content, target) {
			var output;
			target = target || 'stdout';
			switch(target) {
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

		printUserInput: function(content) {
			this._print(content, 'terminusjs-userinput').show();
		},

		clear: function() {
			this.element.innerHTML = '';
		}
	};

	return Output;
});
/**
 * Copyright © 2012 Ramón Lamana
 */
 define('ui/display',['require','core/events','core/promise','ui/styles','ui/input','ui/output'],function(require) {

	

	var Events 	= require('core/events');
	var Promise = require('core/promise');

	var Styles 	= require('ui/styles');
	var Input 	= require('ui/input');
	var Output 	= require('ui/output');

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

	/**
	 * Widget 
	 */
	var Display = function(element, settings) {
		var self = this,
			setter;

		// Events support
		this.events = new Events();

				// Load settings
		for(var key in settings) {
			if (!settings.hasOwnProperty(key))
				continue;
			this.settings[key] = settings[key];
		}

		// Create DOM elements structure
		this.element = element;
		this.element.className = 'terminusjs';

		// Create DOM output element
		this.output = new Output();
		this.output.appendTo(this.element);

		// Create DOM input element
		this.input = new Input({
			editable: true
		});
		this.input.appendTo(this.element).show();

		this.input.events.on('enter', this.enter, this);
		this.input.events.on('historyBack', this.historyBack, this);
		this.input.events.on('historyForward', this.historyForward, this);
		this.input.events.on('autocomplete', this.autocomplete, this);

		this._currentInput = this.input;
		
		// CTRL + Z support
		element.addEventListener('keydown', function(e) {
			if(e.ctrlKey && e.keyCode == 90) {
				self.read();
			}
		});

		this.output.print(this.settings.welcome, 'web');
		this.prompt();
		
		element.addEventListener('click', function(e){
			self.focus();
		});

		if (!!this.settings.shell)
			this.connectShell(this.settings.shell);

		this._historyIndex = 0;
	};

	Display.prototype = {
		_shell: null,
		_historyIndex: 0,
		_currentInput: null,

		settings: {
	 		welcome: '<p>Terminus.js<br/>Copyright 2011-2012 Ramón Lamana.</p>'
		},

		focus: function(){
			this._currentInput.focus();
		},

		historyReset: function() {
			this._historyIndex = this._shell.history.length;
		},

		historyBack: function() {
			this._historyIndex--;
			var command = this._shell.history[this._historyIndex];

			if (command)
				this.input.setValue(command);
			else
				this._historyIndex = 0;
		},

		historyForward: function() {
			this._historyIndex++;
			var command = this._shell.history[this._historyIndex];

			if (command) 
				this.input.setValue(command);
			else 
				this.historyReset();
		},

		prompt: function(withContent) {
			this.input.clear()

			if(typeof withContent !== 'undefined')
				this.input.setValue(withContent);

			this.input.show().focus();
		},

		idle: function() {
			this.input.hide();
			this.element.focus();
		},

		enter: function(inputElement) {
			var command = inputElement.getValue(),
				promise = new Promise(),
				self = this;

			// Show command entered in output and hide 
			// prompt waiting for next read operation
			this._printInput();
			this.idle();

			promise.then(function() {
				self.prompt();
			});

			if(command === '') {
				promise.done();
				return;
			}

			if(!!this._shell) {
				// Execute Command
				this._shell.exec(command).then(function(){
					promise.done();
				});
			}

			this.historyReset();
		},

		autocomplete: function() {
			var commands = this._shell.search(this.input.getValue());

			if(commands.length > 1) {
				this._printInput();
				this.output.print(commands.join(' '), 'stdout');
				this.prompt(this.input.getValue());
			}
			else if(commands.length === 1) {
				this.prompt(commands[0]);
			}
		},

		connectShell: function (shell) {
			var streams = shell.streams;
			this._shell = shell;

			// Listen to its output streams
			streams.stdout.events.on('data', function(data){
				this.output.print(data, 'stdout');
			}, this);

			streams.stderr.events.on('data', function(data){
				this.output.print(data, 'stderr');
			}, this);

			streams.web.events.on('data', function(data){
				this.output.print(data, 'web');
			}, this);

			// Listen to other events on shell
			streams.stdin.events.on('clear', this.output.clear, this.output);

			// Listen to input read events
			streams.stdin.events.on('read', this._read, this);

			this.historyReset();
		},

		_read: function() {
			var input = new Input({
				prompt: '',
				editable: true
			});			

			this._currentInput = input;

			input.appendTo(this.element)
				.show()
				.focus();

			input.events.on('enter', function(input) {
				var stream = this._shell.streams.stdin.pipe();
				stream.write(input.getValue());
				this._shell.streams.stdin.end();

				input.setEditable(false);
				this.element.removeChild(input.element);
				this._currentInput = this.input; // restore to prompt
			}, this);
		},

		_printInput: function() {
			var commandElement = new Input();
			commandElement
				.setPrompt(this.input.getPrompt())
				.setValue(this.input.text.innerHTML)
				.show();

			this.output.printUserInput(commandElement.element.outerHTML);
		}
	};

	return Display;
});

/**
 * Copyright © 2012 Ramón Lamana
 */
 define('system/process',['require','core/events','core/promise','io/outputstream'],function(require) {
	
	

	var Process;
	var Events = require('core/events');
	var Promise = require('core/promise');

	var OutputStream = require('io/outputstream');

	/**
	 * @private
	 */
	var ProcessTable = {
		list: [],

		register: function(process) {
			if(!(process instanceof Process))
				console.error('Trying to register a non Process object');

			this.list.push(process);
			return this.list.length - 1;
		}
	};

	/**
	 * @class
	 */
	Process = function(streams) {
		this.pid = ProcessTable.register(this);
		this.events = new Events;
		this.streams = streams;

		this._promise = new Promise();
	};

	Process.prototype = {
		pid: null,

		_promise: null,

		toString: function() {
			return '[Process:' + this.pid + ']';
		},

		read: function() {
			return this.streams.stdin.read();
		},

		/**
		 *
		 * @param {String} output
		 * @param {String|OutputStream} target Output stream or the standard output values: 'stdout', 'stderr' or 'web'.
		 */
		write: function(output, target) {
			var ostream;

			target = target || 'stdout';

			if (typeof target === 'string')
				target = target.toLowerCase();

			if(target instanceof OutputStream)
				ostream = target;
			else if(target !== 'stdin')
				ostream = this.streams[target];

			if(!ostream) {
				console.error(this.toString() + ' Method write(): The target \''+ target +'\' is not a valid stream');
				return;
			}

			ostream.write(output);
		},

		exit: function(value) {
			this._promise.done();
		},

		/**
		 * Execute the command in the process context. That is 
		 * calls the function passed as a parametes with this process
		 * as scope.
		 */
		exec: function(command, args) {
			var promise = new Promise();

			if(typeof command !== 'function') {
				console.error(this.toString + ': Could not execute process because the given command is not a function');
				this.exit(1);
			}

			command.apply(this, args);
			return this._promise;
		}
	};

	return Process;
	
});

/**
 * Copyright © 2012 Ramón Lamana
 */
 define('system/shell',['require','core/util','core/promise','system/process','io/inputstream','io/outputstream'],function(require) {
	
	

	var Util = require('core/util');
	var Promise = require('core/promise');

	var Process = require('system/process');
	var InputStream = require('io/inputstream');
	var OutputStream = require('io/outputstream');

	/**
	 * @class
	 */
	var Shell = function(commands) {
		this._environment = {};

		if(commands)
			this.include(commands);

		// Create Standard Streams
		this.streams = {
			stdin: new InputStream(),
			stdout: new OutputStream(),
			stderr: new OutputStream(),
			web: new OutputStream()
		};

		this.commands = [];
		this.history = [];
	};

	Shell.prototype = {
		commands: null,
		streams: null,
		history: null,

		_environment: null,
		
		getEnv: function(key) {
			return this._environment[key] ? this._environment[key] : null;
		},

		exec: function(input) {
			var commandsGroup, proc;

			this.history.push(input);

			input = this._parse(input);

			// Execute first shell native commands
			if (this.native[input.command]) {
				this.native[input.command].apply(this, input.args);
				return Promise.done();
			} else {
				// Search command in commander stack
				for(var i = this.commands.length; i--;) {
					commandsGroup = this.commands[i];
					if (commandsGroup[input.command]) {
						var proc = new Process(this.streams);
						return proc.exec(commandsGroup[input.command], input.args); // Return promise
					} 
				}
			}

			this.streams.stderr.write("Command '"+input.command+"' not found.");

			return Promise.done();
		},

		search: function(key) {
			var found = [], commands = [];

			for(var i = this.commands.length; i--;) 
				commands = Util.Array.merge(commands, Object.keys(this.commands[i]));
			
			var regexp = new RegExp('^'+key, "i");

			// Proposal only for commands not for arguments
			//if(arguments.length <= 1) {
				for (var i = commands.length; i--;) {
					if (regexp.test(commands[i])) {
						found.push(commands[i]);
					}
				}
			//}
			// @todo proposal for arguments asking the commander. Adding else here.

			return found;
		},

		/**
		 * Attaches a group of commands and start listening to its done event
		 */
		include: function(groupORname, func) {
			var group;
			if (arguments.length > 1 && typeof groupORname === 'string') {
				group = {};
				group[groupORname] = func;
			} 
			else
				group = groupORname;

			this.commands.push(group); 
		},

		/**
		 * Parse input string to get commands and args
		 */
		_parse: function(input) {
			var command, args = input.split(' ');
			command = args[0];
			args.shift();
			return {
				command: command,
				args: args
			};
		},

		/**
		 * Shell native commands
		 */
		native: {
			history: function() {
				var output = ''
				for(var i=0, l=this.history.length; i<l; i++)
					output += ' ' + i + ': ' + this.history[i] + '\n';

				this.streams.stdout.write(output);
			},

			clear: function() {
				this.streams.stdin.events.emit('clear');
			}
		}
	};

	return Shell;
});





/**
 * Copyright © 2012 Ramón Lamana
 */
define('terminus',['require','ui/display','system/shell','system/process'],function(require) {
	
	

	/**
	 * @class
	 */
	var Terminus = function() {
	};

	Terminus.prototype = {
	};
	
	Terminus.version = '0.5';

	Terminus.Display = require('ui/display');
	Terminus.Shell 	 = require('system/shell');
	Terminus.Process = require('system/process');

	return Terminus;
});
exports.Terminus = require('terminus');
})(window);