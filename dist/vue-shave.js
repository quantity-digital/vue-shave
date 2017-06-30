var VueShave =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueShave = __webpack_require__(1);

Object.keys(_vueShave).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _vueShave[key];
    }
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VueShave = undefined;

__webpack_require__(2);

var VueShave = exports.VueShave = {

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
		// Merge settings with defaults
		this.settings.height = typeof options.height === 'undefined' ? this.defaults.height : options.height;
		this.settings.throttle = typeof options.throttle === 'undefined' ? this.defaults.throttle : options.throttle;
		this.settings.spaces = typeof options.spaces === 'undefined' ? this.defaults.spaces : options.spaces;
		this.settings.character = typeof options.character === 'undefined' ? this.defaults.character : options.character;

		// Our throttled run function
		var runShaversThrottled = this.throttle(this.runShavers, this.defaults.throttle, this);

		var that = this;

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
	},
	throttle: function throttle(fn, threshhold, scope) {
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
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ })
/******/ ]);