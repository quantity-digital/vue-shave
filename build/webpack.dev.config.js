const path = require( 'path' );

const sharedConfig = {
	entry: path.join( __dirname, '../example/main.js' ),
	output: {
		path: path.resolve( __dirname, '../example' ),		
		filename: 'main.bundle.js',
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
	devServer: {
		contentBase: [ 
			path.join( __dirname, '../example/' ),
			path.join( __dirname, '../dist/' ),
		],
	},
};

module.exports = [ sharedConfig ];
