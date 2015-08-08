import cli from './util/cli';
import env from './util/env';
import fs from './util/fs';
import gulp from 'gulp';

let isWatching = false,
	paths = {
		src: [
			env.getSrcPath('assets/media/**'),
			env.getSrcPath('{.gitignore,CNAME,README.md}')
		],
		dest: env.getDestPath()
	};

gulp.task('buildStatic', function () {
	if (cli.watch && !isWatching) {
		isWatching = true;
		gulp.watch(paths.src, ['buildStatic']);
	}

	return fs
		.src(paths.src)
		.pipe(fs.dest(paths.dest));
});
