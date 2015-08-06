import cli from './util/cli';
import fs from './util/fs';
import gulp from 'gulp';
import plug from './util/plug';
import pkg from './util/pkg';

let paths = {
	src: ['src/**/*.html', '!src/assets/**'],
	partials: 'src/assets/partials/**/*.hbs',
	dest: 'web'
};

gulp.task('buildMarkup', function () {
	return fs
		.src(paths.src)
		.pipe(plug.frontMatter({
			property: 'meta'
		}))
		.pipe(plug.hb({
			bustCache: cli.watch,
			debug: cli.debug,
			data: {
				year: new Date().getFullYear(),
				cli,
				pkg
			},
			helpers: [
				'./node_modules/handlebars-layouts/index.js'
			],
			partials: [
				paths.partials
			]
		}))
		.pipe(plug.prettify({
			extra_liners: [],         // eslint-disable-line
			indent_inner_html: false, // eslint-disable-line
			indent_char: '\t',        // eslint-disable-line
			indent_size: 1,           // eslint-disable-line
			max_preserve_newlines: 1, // eslint-disable-line
			preserve_newlines: true,  // eslint-disable-line
			wrap_line_length: 999999  // eslint-disable-line
		}))
		.pipe(fs.dest(paths.dest));
});

gulp.task('watchMarkup', function () {
	gulp.watch(paths.src, ['buildMarkup']);
	gulp.watch(paths.partials, ['buildMarkup']);
});
