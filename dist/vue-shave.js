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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_shave__ = __webpack_require__(1);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VueShave", function() { return __WEBPACK_IMPORTED_MODULE_0__vue_shave__["a"]; });



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_shave__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_shave___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_shave__);


const VueShave = {

	// Keep a tally of our shavers so we can remove event listeners later
	shavers: [],

	// Default settings
	defaults: {
		height: 100,
		throttle: 300,
		spaces: null,
		character: null,
	},

	settings: {},

	install( Vue, options ) {

		// Merge settings with defaults
		this.settings.height = typeof options.height === 'undefined' ? this.defaults.height : options.height;
		this.settings.throttle = typeof options.throttle === 'undefined' ? this.defaults.throttle : options.throttle;
		this.settings.spaces = typeof options.spaces === 'undefined' ? this.defaults.spaces : options.spaces;
		this.settings.character = typeof options.character === 'undefined' ? this.defaults.character : options.character;

		// Our throttled run function
		const runShaversThrottled = this.throttle( this.runShavers, this.defaults.throttle, this );

		// Add the shave directive
		Vue.directive( 'shave', {

			bind( el, binding ) {
				const height = ( 'value' in binding && 'height' in binding.value ) ? binding.value.height : VueShave.settings.height;
				const character = ( 'value' in binding && 'character' in binding.value ) ? binding.value.character : VueShave.settings.character;
				const spaces = ( 'value' in binding && 'spaces' in binding.value ) ? binding.value.spaces : VueShave.settings.spaces;

				// Create the function to run on window resize
				const shaveFn = () => {
					console.log( 'shaving' );
					__WEBPACK_IMPORTED_MODULE_0_shave___default.a( el, height, {
						character,
						spaces,
					});
				};

				// Add the shaver to the list
				VueShave.shavers.push({
					el,
					shaveFn,
				});

				// If this is the first shaver, add the resize event listener
				if ( VueShave.shavers.length === 1 ) {
					window.addEventListener( 'resize', runShaversThrottled );
				}

			},
			unbind( el ) {

				// Remove the shaver from the list
				VueShave.removeShaver( el );

				// If there are no shavers, remove the resize listener    
				if ( VueShave.shavers.length === 0 ) {
					window.removeEventListener( 'resize', runShaversThrottled );
				}
			},
			componentUpdated( el ) {
				// Get the shaver for the current element
				const shaver = VueShave.getShaver( el );

				// Run the shaver function
				if ( shaver && shaver.shaveFn ) {
					shaver.shaveFn();
				}
			},
		});

	},

	runShavers() {
		this.shavers.forEach( shaver => shaver.shaveFn() );
	},

	getShaver( el ) {
		const found = this.shavers.filter( shaver => shaver.el === el );
		return found.length ? found[0] : null;
	},

	removeShaver( el ) {
		this.shavers = this.shavers.filter( shaver => shaver.el !== el );
	},

	throttle( fn, threshhold, scope ) {
		threshhold || (threshhold = 250);
		var last,
			deferTimer;
		return function () {
			var context = scope || this;

			var now = +new Date,
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
	},

};
/* harmony export (immutable) */ __webpack_exports__["a"] = VueShave;



/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = undefined;

/***/ })
/******/ ]);