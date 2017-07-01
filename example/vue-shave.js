var vue-shave =
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _shave = __webpack_require__(2);

var _shave2 = _interopRequireDefault(_shave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VueShave = {

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
					(0, _shave2.default)(el, height, {
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

exports.default = VueShave;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.shave = factory());
}(this, (function () { 'use strict';

/* global document, window */
function shaveEl(target, maxHeight) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!maxHeight) throw Error('maxHeight is required');
  var el = target;
  var styles = el.style;
  var character = opts.character || '…';
  var classname = opts.classname || 'js-shave';
  var spaces = opts.spaces || false;
  var charHtml = '<span class="js-shave-char">' + character + '</span>';
  var span = el.querySelector('.' + classname);
  var textProp = el.textContent === undefined ? 'innerText' : 'textContent';

  // If element text has already been shaved
  if (span) {
    // Remove the ellipsis to recapture the original text
    el.removeChild(el.querySelector('.js-shave-char'));
    el[textProp] = el[textProp]; // nuke span, recombine text
  }

  var fullText = el[textProp];
  var words = spaces ? fullText.split(' ') : fullText;

  // If 0 or 1 words, we're done
  if (words.length < 2) return;

  // Temporarily remove any CSS height for text height calculation
  var heightStyle = styles.height;
  styles.height = 'auto';
  var maxHeightStyle = styles.maxHeight;
  styles.maxHeight = 'none';

  // If already short enough, we're done
  if (el.offsetHeight <= maxHeight) {
    styles.height = heightStyle;
    styles.maxHeight = maxHeightStyle;
    return;
  }

  // Binary search for number of words which can fit in allotted height
  var max = words.length - 1;
  var min = 0;
  var pivot = void 0;
  while (min < max) {
    pivot = min + max + 1 >> 1; // eslint-disable-line no-bitwise
    el[textProp] = spaces ? words.slice(0, pivot).join(' ') : words.slice(0, pivot);
    el.insertAdjacentHTML('beforeend', charHtml);
    if (el.offsetHeight > maxHeight) max = spaces ? pivot - 1 : pivot - 2;else min = pivot;
  }

  el[textProp] = spaces ? words.slice(0, max).join(' ') : words.slice(0, max);
  el.insertAdjacentHTML('beforeend', charHtml);
  var diff = spaces ? words.slice(max).join(' ') : words.slice(max);

  el.insertAdjacentHTML('beforeend', '<span class="' + classname + '" style="display:none;">' + diff + '</span>');

  styles.height = heightStyle;
  styles.maxHeight = maxHeightStyle;
}

function shave(target, maxHeight, opts) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  for (var i = 0; i < els.length; i += 1) {
    var el = els[i];
    shaveEl(el, maxHeight, opts);
  }
}

return shave;

})));


/***/ })
/******/ ]);