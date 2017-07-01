const path = require( 'path' );

const sharedConfig = {
	entry: path.join( __dirname, '../example/main.js' ),
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
		contentBase: path.join( __dirname, '../example/' ),
	},
};

const esmConfig = Object.assign({}, sharedConfig, { output: { filename: 'main.esm.js' } });

module.exports = [ esmConfig ];

