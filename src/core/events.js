/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
define(function() {
	'use strict';

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
			for(var i=this.__listeners[eventName].length; i--;)
				this.__listeners[eventName][i].apply(null, data); // Listeners have been binded
		}
	};

	return Events;

});