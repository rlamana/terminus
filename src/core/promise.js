/**
 * jsBase
 * Copyright © 2009-2012 A. Matías Quezada
 * https://github.com/amatiasq
 */
define(function(require) {

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
			queueParallel(promise, promises[i], i, done, result);

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