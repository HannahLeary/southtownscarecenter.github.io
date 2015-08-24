import cli from './util/cli';
import env from './util/env';
import fs from './util/fs';
import cssnext from 'cssnext';
import cssnano from 'cssnano';
import mixins from 'postcss-mixins';
import nested from 'postcss-nested';
import gulp from 'gulp';
import plug from './util/plug';

let isWatching = false,
	paths = {
		src: env.getSrcPath('assets/styles/*.css'),
		all: env.getSrcPath('assets/{elements,styles}/**'),
		dest: env.getDestPath()
	};

gulp.task('buildStyles', function () {
	if (!isWatching && cli.watch) {
		isWatching = true;

		gulp.watch(paths.all, ['buildStyles']);
	}

	return fs
		.src(paths.src)
		.pipe(plug.postcss([
			cssnext(),
			mixins(),
			nested(),
			cssnano()
		]))
		.pipe(fs.dest(paths.dest));
});
