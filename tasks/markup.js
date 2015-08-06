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
		.pipe(fs.dest(paths.dest));
});

gulp.task('watchMarkup', function () {
	gulp.watch(paths.src, ['buildMarkup']);
	gulp.watch(paths.partials, ['buildMarkup']);
});
