/**
 **** WARNING: No ES6 modules here. Not transpiled! ****
 */
/* eslint-disable import/no-nodejs-modules */

/**
 * External dependencies
 */
const fs = require( 'fs' );
const getBaseWebpackConfig = require( 'newspack-scripts/config/getWebpackConfig' );
const path = require( 'path' );
const IgnoreEmitPlugin = require( 'ignore-emit-webpack-plugin' );

/**
 * Internal variables
 */
const editor = path.join( __dirname, 'src', 'js', 'editor' );
const frontEndDir = path.join( __dirname, 'src', 'js', 'front-end' );
const frontEnd = fs
	.readdirSync( frontEndDir )
	.filter( asset => /.js?$/.test( asset ) )
	.reduce(
		( acc, filename ) => ( {
			...acc,
			[ filename.replace( '.js', '' ) ]: path.join( __dirname, 'src', 'js', 'front-end', filename ),
		} ),
		{}
	);
const style = path.join( __dirname, 'src', 'scss', 'style.scss' );

const webpackConfig = getBaseWebpackConfig(
	{ WP: true },
	{
		entry: { editor, ...frontEnd },
		'output-path': path.join( __dirname, 'dist' ),
	}
);
const styleConfig = getBaseWebpackConfig(
	{ WP: false },
	{
		entry: { style },
		'output-path': __dirname,
	}
);

// Don't emit useless JS module files from the style config.
styleConfig.plugins.push( new IgnoreEmitPlugin( /\.js$/ ) );

module.exports = [ webpackConfig, styleConfig ];
