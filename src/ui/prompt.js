/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {

	'use strict';

	var Events = require('core/events');
	var Util = require('core/util');

	var Input = require('ui/input');

	/**
	 * Prompt input class
	 * @class
	 */
	var Prompt = function(settings) {
		var self = this;

		this.settings = {
			editable: false,
			ps: '>'
		};

		for(var key in settings) {
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

		if(!!this.settings.editable) {
			this.input.$el.addEventListener('keydown', function(e) {
				switch(e.keyCode) {
				case 13: // Enter key
					e.preventDefault();
					e.stopPropagation();
					self.events.emit('enter', self.input);
					break;

				case 38: // Up key
					self.events.emit('historyBack', self.input);

					e.preventDefault();
					e.stopPropagation();
					break;

				case 40: // Down key
					self.events.emit('historyForward', self.input);

					e.preventDefault();
					e.stopPropagation();
					break;

				case 9: // Tab key
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

		appendTo: function(element) {
			element.appendChild(this.$el);
			return this;
		},

		show: function () {
			Util.Styles.removeClass(this.$el, 'hidden');
			return this;
		},

		hide: function () {
			Util.Styles.addClass(this.$el, 'hidden');
			return this;
		},

		isVisible: function() {
			return (this.$el.style.display !== 'none') && Util.Styles.hasClass(this.$el, 'terminusjs-box');
		}
	};

	return Prompt;
});
