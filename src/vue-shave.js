import shave from 'shave/dist/shave';
import throttle from 'just-throttle';

// Where we keep our shaver functions
let shavers = [];

// Global defaults
const defaults = {
	height: 100,
	throttle: 300,
	spaces: false,
	character: '...',
};

// Vue plugin install function
function install( Vue, options ) {
	// Merge settings with defaults
	const globalSettings = { ...defaults, ...options };

	// Our throttled run function
	const runShaversThrottled = throttle( runShavers, globalSettings.throttle );

	if ( window ) {
		window.addEventListener( 'load', () => runShavers() );
	}

	// Add the shave directive
	Vue.directive( 'shave', {

		bind( el, binding ) {
			// Setup settings
			const directiveSettings = binding.value || {};
			const settings = { ...globalSettings, ...directiveSettings };

			// Create the function to run on window resize
			// Bound to the given shaver settings
			const shaveFn = (( height, character, spaces ) => {
				console.log( 'shaving' );
				shave( el, height, { character, spaces });
			}).bind( null, settings.height, settings.character, settings.spaces );

			// Add the shaver to the list
			shavers.push({ el, shaveFn });

			// If this is the first shaver, add the resize event listener
			if ( shavers.length === 1 ) {
				window.addEventListener( 'resize', runShaversThrottled );
			}
		},

		unbind( el ) {
			// Remove the shaver from the list
			shavers = shavers.filter( shaver => shaver.el !== el );

			// If there are no shavers, remove the resize listener    
			if ( shavers.length === 0 ) {
				window.removeEventListener( 'resize', runShaversThrottled );
			}
		},

		// Run shaver on inserted
		inserted: runShaver,

		// Run shaver on updated
		componentUpdated: runShaver,
	});

};

function runShavers() {
	shavers.forEach( shaver => shaver.shaveFn() );
};

function runShaver( el ) {
	// Get the shaver for the current element
	const found = shavers.filter( shaver => shaver.el === el );
	const shaver = found.length ? found[ 0 ] : null;

	// Run the shaver function
	if ( shaver && shaver.shaveFn ) {
		shaver.shaveFn();
	}
};

export default { install };
