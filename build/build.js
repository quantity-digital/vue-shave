const fs = require( 'fs' );
const rollup = require( 'rollup' );
const resolve = require( 'rollup-plugin-node-resolve' );
const babel = require( 'rollup-plugin-babel' );
const uglify = require( 'uglify-js' );
const pkg = require( '../package.json' );
const banner =
    '/*!\n' +
    ' * vue-shave v' + pkg.version + '\n' +
    ' * ' + pkg.repository.url + '\n' +
    ' * Released under the MIT License.\n' +
    ' */\n';

rollup.rollup({
	entry: 'src/index.js',
	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/**', // only transpile our source code
		}),
	],
	external: [ 'shave/dist/shave' ],
})
.then( function( bundle ) {
	return write( 'dist/vue-shave.js', bundle.generate({
		format: 'umd',
		banner: banner,
		moduleName: 'VueResource',
	}).code, bundle );
})
.then( function( bundle ) {
	const code = fs.readFileSync( 'dist/vue-shave.js', 'utf8' );
	return write( 'dist/vue-shave.min.js',
		banner + '\n' + uglify.minify( code ).code,
		bundle );
})
.then( function( bundle ) {
	return write( 'dist/vue-shave.es2015.js', bundle.generate({
		format: 'es',
		banner: banner,
	}).code, bundle );
})
.then( function( bundle ) {
	return write( 'dist/vue-shave.common.js', bundle.generate({
		format: 'cjs',
		banner: banner,
	}).code, bundle );
})
.catch( logError );

function write( dest, code, bundle ) {
	return new Promise( function( resolve, reject ) {
		fs.writeFile( dest, code, function( err ) {
			if ( err ) return reject( err );
			console.log( blue( dest ) + ' ' + getSize( code ) );
			resolve( bundle );
		});
	});
}

function getSize( code ) {
	return ( code.length / 1024 ).toFixed( 2 ) + 'kb';
}

function logError( e ) {
	console.log( e );
}

function blue( str ) {
	return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
