/*!
 * vue-shave v1.0.2
 * https://github.com/quantity-digital/vue-shave.git
 * Released under the MIT License.
 */

import shave from 'shave/dist/shave';

var index = throttle;

function throttle (fn, interval, immediate) {
  var wait = false;
  var callNow = false;
  return function () {
    var callNow = immediate && !wait;
    var context = this;
    var args = arguments;
    if (!wait) {
      wait = true;
      setTimeout(function () {
        wait = false;
        return fn.apply(context, args);
      }, interval);
    }
    if (callNow) {
      return fn.apply(this, arguments);
    }
  }
}

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

// Where we keep our shaver functions
var shavers = [];

// Global defaults
var defaults = {
	height: 100,
	throttle: 300,
	spaces: false,
	character: '...'
};

// Vue plugin install function
function install(Vue, options) {
	// Merge settings with defaults
	var globalSettings = _extends({}, defaults, options);

	// Our throttled run function
	var runShaversThrottled = index(runShavers, globalSettings.throttle);

	if (window) {
		window.addEventListener('load', function () {
			return runShavers();
		});
	}

	// Add the shave directive
	Vue.directive('shave', {
		bind: function bind(el, binding) {
			// Setup settings
			var directiveSettings = binding.value || {};
			var settings = _extends({}, globalSettings, directiveSettings);

			// Create the function to run on window resize
			// Bound to the given shaver settings
			var shaveFn = function (height, character, spaces) {
				console.log('shaving');
				shave(el, height, { character: character, spaces: spaces });
			}.bind(null, settings.height, settings.character, settings.spaces);

			// Add the shaver to the list
			shavers.push({ el: el, shaveFn: shaveFn });

			// If this is the first shaver, add the resize event listener
			if (shavers.length === 1) {
				window.addEventListener('resize', runShaversThrottled);
			}
		},
		unbind: function unbind(el) {
			// Remove the shaver from the list
			shavers = shavers.filter(function (shaver) {
				return shaver.el !== el;
			});

			// If there are no shavers, remove the resize listener    
			if (shavers.length === 0) {
				window.removeEventListener('resize', runShaversThrottled);
			}
		},


		// Run shaver on inserted
		inserted: runShaver,

		// Run shaver on updated
		componentUpdated: runShaver
	});
}

function runShavers() {
	shavers.forEach(function (shaver) {
		return shaver.shaveFn();
	});
}

function runShaver(el) {
	// Get the shaver for the current element
	var found = shavers.filter(function (shaver) {
		return shaver.el === el;
	});
	var shaver = found.length ? found[0] : null;

	// Run the shaver function
	if (shaver && shaver.shaveFn) {
		shaver.shaveFn();
	}
}

var VueShave$1 = { install: install };

export default VueShave$1;
