import cli from './util/cli';
import jspm from 'jspm';
import gulp from 'gulp';

let paths = {
	main: 'scripts/main',
	all: 'src/assets/scripts/**',
	dest: 'web/assets/scripts/main.js'
};

gulp.task('buildScripts', function () {
	return jspm.bundleSFX(paths.main, paths.dest, {
		minify: cli.env === 'prod',
		sourceMaps: cli.maps && 'inline'
	});
});

gulp.task('watchScripts', function () {
	gulp.watch(paths.all, ['buildScripts']);
});
