const fs = require( 'fs' );
const path = require( 'path' );
const chokidar = require( 'chokidar' );
const postcss = require( 'postcss' );
const sass = require( 'sass' );
const cssnano = require('cssnano');
const rtlcss = require( 'rtlcss' );
const postcssFocusWithin = require( path.resolve( __dirname, '../node_modules/newspack-scripts/node_modules/postcss-focus-within' ) );

const isWatching = process.argv.some( arg => arg.startsWith( '--watch' ) )

/**
 * Save a file do disk.
 */
const saveFile = ( fileName, content ) => {
	fs.writeFile( fileName, content, function ( err ) {
		if ( err ) {
			console.log( 'ERROR while saving file', fileName, '->', err );
		}
	} );
};

/**
 * Compile a Sass file to CSS.
 *
 * @param  {string} inFile  Sass file path
 * @param  {string} outFile out file path
 * @param  {bool} withRTL Whether to save RTL version additionally
 */
const compileSassFile = ( { inFile, outFile, withRTL } ) =>
	new Promise( ( resolve, reject ) => {
		sass.render(
			{
				file: inFile,
				outputStyle: 'expanded',
				outFile,
			},
			function ( error, result ) {
				if ( error ) {
					console.log( 'ERROR in sass compilation', error );
					reject( error );
				} else {
					// process the file with PostCSS
					const postCSSProcessors = [
						postcssFocusWithin,
						...(isWatching ? [] : [cssnano])
					]
					postcss( postCSSProcessors )
						.process( result.css, { from: inFile, to: outFile } )
						.then( result => {
							// save the file
							saveFile( outFile, result.css );
							// save the RTL version file
							if ( withRTL ) {
								saveFile( outFile.replace( '.css', '-rtl.css' ), rtlcss.process( result.css ) );
							}

							resolve( outFile );
						} );
				}
			}
		);
	} );

const compileAllStylesheets = () => {
	Promise.all( SASS_STYLESHEETS.map( compileSassFile ) ).then( files => {
		console.log( `processed ${ files.length } SCSS files ✨
` );
	} );
};

const SASS_STYLESHEETS = [
	{ inFile: 'src/scss/style.scss', outFile: 'style.css', withRTL: true },
];

// initial run
compileAllStylesheets();

// run watcher if `--watch` argument present
if ( isWatching ) {
	console.log( `watching the scss files…
` );

	chokidar.watch( 'src/scss/**/*.scss' ).on( 'change', path => {
		console.log( `updated: ${ path }
` );

		compileAllStylesheets();
	} );
}
