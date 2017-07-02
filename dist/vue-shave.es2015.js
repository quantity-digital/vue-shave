/*!
 * vue-shave v1.0.0
 * git+https://github.com/quantity-digital/vue-shave.git
 * Released under the MIT License.
 */

import shave from 'shave/dist/shave';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var VueShave$1 = {

	// Keep a tally of our shavers so we can remove event listeners later
	shavers: [],

	// Default settings
	defaults: {
		height: 100,
		throttle: 300,
		spaces: null,
		character: null
	},

	settings: {},

	install: function install(Vue, options) {
		var _this = this;

		// Merge settings with defaults
		this.settings = _extends({}, this.defaults, options);

		// Our throttled run function
		var runShaversThrottled = throttle(this.settings.throttle, false, this.runShavers);

		var that = this;

		if (window) {
			window.addEventListener('load', function () {
				return _this.runShavers();
			});
		}

		// Add the shave directive
		Vue.directive('shave', {
			bind: function bind(el, binding) {
				var height = 'value' in binding && 'height' in binding.value ? binding.value.height : that.settings.height;
				var character = 'value' in binding && 'character' in binding.value ? binding.value.character : that.settings.character;
				var spaces = 'value' in binding && 'spaces' in binding.value ? binding.value.spaces : that.settings.spaces;

				// Create the function to run on window resize
				var shaveFn = function shaveFn() {
					console.log('shaving');
					shave(el, height, {
						character: character,
						spaces: spaces
					});
				};

				// Add the shaver to the list
				that.shavers.push({
					el: el,
					shaveFn: shaveFn
				});

				// If this is the first shaver, add the resize event listener
				if (that.shavers.length === 1) {
					window.addEventListener('resize', runShaversThrottled);
				}
			},
			unbind: function unbind(el) {

				// Remove the shaver from the list
				that.removeShaver(el);

				// If there are no shavers, remove the resize listener    
				if (that.shavers.length === 0) {
					window.removeEventListener('resize', runShaversThrottled);
				}
			},
			inserted: function inserted(el) {
				that.runShaver(el);
			},
			componentUpdated: function componentUpdated(el) {
				that.runShaver(el);
			}
		});
	},
	runShavers: function runShavers() {
		this.shavers.forEach(function (shaver) {
			return shaver.shaveFn();
		});
	},
	runShaver: function runShaver(el) {
		// Get the shaver for the current element
		var shaver = this.getShaver(el);

		// Run the shaver function
		if (shaver && shaver.shaveFn) {
			shaver.shaveFn();
		}
	},
	getShaver: function getShaver(el) {
		var found = this.shavers.filter(function (shaver) {
			return shaver.el === el;
		});
		return found.length ? found[0] : null;
	},
	removeShaver: function removeShaver(el) {
		this.shavers = this.shavers.filter(function (shaver) {
			return shaver.el !== el;
		});
	}
};

function throttle(fn, threshhold, scope) {
	threshhold || (threshhold = 250);
	var last, deferTimer;
	return function () {
		var context = scope || this;

		var now = +new Date(),
		    args = arguments;
		if (last && now < last + threshhold) {
			// hold on to it
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function () {
				last = now;
				fn.apply(context, args);
			}, threshhold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
}

export default VueShave$1;