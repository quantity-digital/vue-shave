const path = require( 'path' );
const { defaultsDeep } = require( 'lodash' );

const sharedConfig = {
	entry: './src/index.js',
	output: {
		path: path.resolve( __dirname, '../dist' ),		
		library: 'vue-shave',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
				loader: 'babel-loader',
			},
		}],
	},
};

const cjsConfig = {
	output: {
		filename: 'vue-shave.cjs.js',
		libraryTarget: 'commonjs2',
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

const globalConfig = {
	output: {
		filename: 'vue-shave.js',
		libraryTarget: 'var',	
	},
};

module.exports = [
	defaultsDeep({}, cjsConfig, sharedConfig ),
	defaultsDeep({}, globalConfig, sharedConfig ),
	defaultsDeep({}, { output: { path: path.resolve( __dirname, '../example' ) } }, cjsConfig, sharedConfig ),
	defaultsDeep({}, { output: { path: path.resolve( __dirname, '../example' ) } }, globalConfig, sharedConfig ),
];
