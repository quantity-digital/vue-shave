const fs      = require( 'fs' );
const rollup  = require( 'rollup' );
const resolve = require( 'rollup-plugin-node-resolve' );
const babel   = require( 'rollup-plugin-babel' );
const commonjs   = require( 'rollup-plugin-commonjs' );
const uglify  = require( 'uglify-js' );

const pkg     = require( '../package.json' );

const filename = 'vue-shave';
const moduleName = 'VueShave';
const banner =
`/*!
 * ${ pkg.name } v${ pkg.version }
 * ${ pkg.repository.url }
 * Released under the MIT License.
 */
`;

rollup.rollup({
	entry: 'src/index.js',
	plugins: [
		commonjs(),
		resolve(),
		babel({
			exclude: 'node_modules/**', // only transpile our source code
		}),
	],
	external: [ 'shave/dist/shave' ],
})
.then( function( bundle ) {
	return write( `dist/${ filename }.js`, bundle.generate({
		format: 'umd',
		banner: banner,
		moduleName: moduleName,
	}).code, bundle );
})
.then( function( bundle ) {
	const code = fs.readFileSync( `dist/${ filename }.js`, 'utf8' );
	return write( `dist/${ filename }.min.js`,
		banner + '\n' + uglify.minify( code ).code,
		bundle );
})
.then( function( bundle ) {
	return write( `dist/${ filename }.es2015.js`, bundle.generate({
		format: 'es',
		banner: banner,
	}).code, bundle );
})
.then( function( bundle ) {
	return write( `dist/${ filename }.common.js`, bundle.generate({
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
