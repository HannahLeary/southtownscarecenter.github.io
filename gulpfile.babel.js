import cli from './tasks/util/cli';
import gulp from 'gulp';
import requireGlob from 'require-glob';
import runSequence from 'run-sequence';

gulp.task('default', function (done) {
	if (cli.watch) {
		runSequence('clean', 'build', 'watch', done);
	}
	else {
		runSequence('clean', 'build', done);
	}
});

gulp.task('clean', ['cleanDest']);

gulp.task('build', ['buildMedia', 'buildMarkup', 'buildStyles', 'buildScripts']);

gulp.task('deploy', ['deployDest']);

gulp.task('watch', ['serveDest', 'watchMedia', 'watchMarkup', 'watchStyles', 'watchScripts', 'watchDest']);

requireGlob.sync('./tasks/*.js');
