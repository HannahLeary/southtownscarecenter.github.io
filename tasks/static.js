import fs from './util/fs';
import gulp from 'gulp';

let paths = {
	src: ['src/assets/media/**', 'src/{.gitignore,README.md}'],
	dest: 'web'
};

gulp.task('buildStatic', function () {
	return fs
		.src(paths.src)
		.pipe(fs.dest(paths.dest));
});

gulp.task('watchStatic', function () {
	gulp.watch(paths.src, ['watchStatic']);
});
