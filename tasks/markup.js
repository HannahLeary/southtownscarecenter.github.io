import cli from './util/cli';
import fs from './util/fs';
import gulp from 'gulp';
import plug from './util/plug';

let paths = {
	src: ['src/**/*.html', '!src/assets/**'],
	all: ['src/**/*.{hbs,html}', '!src/assets/**'],
	dest: 'web'
};

gulp.task('buildMarkup', function () {
	return fs
		.src(paths.src)
		.pipe(plug.frontMatter({
			property: 'meta'
		}))
		.pipe(plug.hb({
			data: { cli },
			helpers: [],
			partials: []
		}))
		.pipe(fs.dest(paths.dest));
});

gulp.task('watchMarkup', function () {
	gulp.watch(paths.all, ['buildMarkup']);
});
