import cli from './util/cli';
import env from './util/env';
import fs from './util/fs';
import cssnext from 'cssnext';
import cssnano from 'cssnext';
import gulp from 'gulp';
import plug from './util/plug';

let isWatching = false,
	paths = {
		src: env.getSrcPath('assets/styles/main.css'),
		all: env.getSrcPath('assets/styles/**'),
		dest: env.getDestPath()
	};

gulp.task('buildStyles', function () {
	if (cli.watch && !isWatching) {
		isWatching = true;
		gulp.watch(paths.all, ['buildStyles']);
	}

	return fs
		.src(paths.src)
		.pipe(plug.postcss([
			cssnext(),
			cssnano()
		]))
		.pipe(fs.dest(paths.dest));
});
