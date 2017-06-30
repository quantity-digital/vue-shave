import shave from 'shave';

export const VueShave = {

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
					shave( el, height, {
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
