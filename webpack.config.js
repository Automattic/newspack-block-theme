/**
 **** WARNING: No ES6 modules here. Not transpiled! ****
 */
/* eslint-disable import/no-nodejs-modules, @typescript-eslint/no-var-requires */

/**
 * External dependencies
 */
const fs = require( 'fs' );
const getBaseWebpackConfig = require( 'newspack-scripts/config/getWebpackConfig' );
const path = require( 'path' );

/**
 * Internal variables
 */
const frontEndDir = path.join( __dirname, 'src', 'js', 'front-end' );
const frontEnd = fs
	.readdirSync( frontEndDir )
	.filter( asset => /.(j|t)sx?$/.test( asset ) )
	.reduce(
		( acc, filename ) => ( {
			...acc,
			[ filename.replace( /\.[^/.]+$/, '' ) ]: path.join(
				__dirname,
				'src',
				'js',
				'front-end',
				filename
			),
		} ),
		{}
	);
const blocks = fs
	.readdirSync( path.join( __dirname, 'includes', 'blocks' ) )
	.reduce( ( acc, asset ) => {
		if ( fs.lstatSync( path.join( __dirname, 'includes', 'blocks', asset ) ).isDirectory() ) {
			fs.readdirSync( path.join( __dirname, 'includes', 'blocks', asset ) )
				.filter( file => /\.(j|t)sx?$/.test( file ) )
				.forEach( file => {
					const name = file.replace( /\.[^/.]+$/, '' );
					acc[ `${ asset }-${ name }` ] = path.join( __dirname, 'includes', 'blocks', asset, file );
				} );
		}
		return acc;
	}, {} );

const editor = path.join( __dirname, 'src', 'js', 'editor' );

const webpackConfig = getBaseWebpackConfig(
	{
		entry: { editor, ...frontEnd, ...blocks },
		output: {
			path: path.join( __dirname, 'dist' ),
		}
	}
);
module.exports = webpackConfig;
