import gulp from 'gulp';
import requireGlob from 'require-glob';
import runSequence from 'run-sequence';

gulp.task('default', function (done) {
	runSequence('clean', 'build', done);
});

gulp.task('deploy', function (done) {
	runSequence('build', 'deployDest', done);
});

gulp.task('clean', ['cleanDest']);

gulp.task('build', ['buildStatic', 'buildMarkup', 'buildStyles', 'buildScripts']);

gulp.task('serve', function (done) {
	runSequence('default', 'serveDest', done);
});

requireGlob.sync('./tasks/*.js');
