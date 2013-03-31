/**
 * Terminus.js
 * Copyright © 2012 Ramón Lamana
 */
define(function(require) {

	'use strict';

	var Events = require('core/events');
	var Util = require('core/util');

	/**
	 * Client Input class
	 * @class
	 */
	var Input = function(settings) {
		var self = this;

		this.settings = {
			editable: false
		};

		for(var key in settings) {
			if (settings.hasOwnProperty(key))
				this.settings[key] = settings[key];
		}

		// Events support
		this.events = new Events();

		// DOM elements structure
		this.$el = document.createElement('div');
		this.$el.className = 'terminusjs-input';
		this.$el.innerHTML = '';

		if(!!this.settings.editable) {
			this.$el.contentEditable = true;
			this.$el.addEventListener('keydown', function(e) {
				switch(e.keyCode) {
				case 13: // Enter key
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

		appendTo: function(element) {
			element.appendChild(this.$el);
			return this;
		},

		focus: function () {
			this.$el.focus();
			this.placeCursorToEnd();

			this.events.emit('focus', this);

			return this;
		},

		clear: function() {
			this.value = '';
			return this;
		},

		isVisible: function() {
			return (this.$el.style.display !== 'none') && Util.Styles.hasClass(this.$el, 'terminusjs-box');
		},

		placeCursorToEnd: function() {
			var range, selection;
		    if(document.createRange) { // Firefox, Chrome, Opera, Safari, IE 9+
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
});
