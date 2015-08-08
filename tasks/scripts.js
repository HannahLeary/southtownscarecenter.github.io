import cli from './util/cli';
import env from './util/env';
import jspm from 'jspm';
import gulp from 'gulp';

let isWatching = false,
	paths = {
		main: 'scripts/main',
		all: env.getSrcPath('assets/scripts/**'),
		dest: env.getDestPath('assets/scripts/main.js')
	};

gulp.task('buildScripts', function () {
	if (cli.watch && !isWatching) {
		isWatching = true;
		gulp.watch(paths.all, ['buildScripts']);
	}

	return jspm.bundleSFX(paths.main, paths.dest, {
		minify: cli.env === 'prod',
		sourceMaps: cli.maps && 'inline'
	});
});
