import fs from './util/fs';
import cssnext from 'cssnext';
import cssnano from 'cssnext';
import gulp from 'gulp';
import plug from './util/plug';

let paths = {
	src: 'src/assets/styles/main.css',
	all: 'src/assets/styles/**',
	dest: 'web'
};

gulp.task('buildStyles', function () {
	return fs
		.src(paths.src)
		.pipe(plug.postcss([
			cssnext(),
			cssnano()
		]))
		.pipe(fs.dest(paths.dest));
});

gulp.task('watchStyles', function () {
	gulp.watch(paths.all, ['buildStyles']);
});
