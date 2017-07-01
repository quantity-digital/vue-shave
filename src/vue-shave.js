import shave from 'shave/dist/shave';

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
		this.settings = { ...this.defaults, ...options };

		// Our throttled run function
		const runShaversThrottled = throttle( this.settings.throttle, false, this.runShavers );

		const that = this;

		if ( window ) {
			window.addEventListener( 'load', () => this.runShavers() );
		}

		// Add the shave directive
		Vue.directive( 'shave', {

			bind( el, binding ) {
				const height = ( 'value' in binding && 'height' in binding.value ) ? binding.value.height : that.settings.height;
				const character = ( 'value' in binding && 'character' in binding.value ) ? binding.value.character : that.settings.character;
				const spaces = ( 'value' in binding && 'spaces' in binding.value ) ? binding.value.spaces : that.settings.spaces;

				// Create the function to run on window resize
				const shaveFn = () => {
					console.log( 'shaving' );
					shave( el, height, {
						character,
						spaces,
					});
				};

				// Add the shaver to the list
				that.shavers.push({
					el,
					shaveFn,
				});

				// If this is the first shaver, add the resize event listener
				if ( that.shavers.length === 1 ) {
					window.addEventListener( 'resize', runShaversThrottled );
				}
			},
			unbind( el ) {

				// Remove the shaver from the list
				that.removeShaver( el );

				// If there are no shavers, remove the resize listener    
				if ( that.shavers.length === 0 ) {
					window.removeEventListener( 'resize', runShaversThrottled );
				}
			},
			inserted( el ) {
				that.runShaver( el );
			},
			componentUpdated( el ) {
				that.runShaver( el );
			},
		});

	},

	runShavers() {
		this.shavers.forEach( shaver => shaver.shaveFn() );
	},

	runShaver( el ) {
		// Get the shaver for the current element
		const shaver = this.getShaver( el );

		// Run the shaver function
		if ( shaver && shaver.shaveFn ) {
			shaver.shaveFn();
		}
	},

	getShaver( el ) {
		const found = this.shavers.filter( shaver => shaver.el === el );
		return found.length ? found[0] : null;
	},

	removeShaver( el ) {
		this.shavers = this.shavers.filter( shaver => shaver.el !== el );
	},

};

function throttle( fn, threshhold, scope ) {
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
}

export default VueShave;
