const path = require( 'path' );

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve( __dirname, 'dist' ),
		filename: 'vue-shave.js',
		library: 'VueShave',
	},
	externals: {
		'shave': {
			commonjs: 'shave',
			commonjs2: 'shave',
			amd: 'shave',
			root: 'shave',
		},
	},
};
