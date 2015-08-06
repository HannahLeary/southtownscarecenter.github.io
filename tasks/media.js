import fs from './util/fs';
import gulp from 'gulp';

let paths = {
	src: 'src/assets/media/**',
	all: 'src/assets/media/**',
	dest: 'web'
};

gulp.task('buildMedia', function () {
	return fs
		.src(paths.src)
		.pipe(fs.dest(paths.dest));
});

gulp.task('watchMedia', function () {
	gulp.watch(paths.all, ['watchMedia']);
});
