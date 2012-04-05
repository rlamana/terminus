(function(global) {
	
	var Events = function() {
		this.__listeners = {};
	}

	Events.prototype = {
		on: function(eventName, listener, scope) {
			if(!this.__listeners[eventName])
				this.__listeners[eventName] = [];

			this.__listeners[eventName].push(listener.bind(scope?scope:this));
		},

		emit: function(eventName, data) {
			if(!this.__listeners[eventName])
				return;

			for(var i=this.__listeners[eventName].length; i--; )
				this.__listeners[eventName][i](data);
		}
	};

	global.Events = Events;
	
})( window );