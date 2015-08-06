import cli from './util/cli';
import del from 'del';
import gulp from 'gulp';
import plug from './util/plug';

let paths = {
	all: 'web/**/{.*,*.*}',
	dest: 'web'
};

gulp.task('cleanDest', function (done) {
	del(paths.dest, done);
});

gulp.task('deployDest', function () {
	return gulp
		.src(paths.all)
		.pipe(plug.ghPages({
			branch: 'master'
		}));
});

gulp.task('serveDest', function () {
	plug.connect
		.server({
			livereload: cli.watch,
			port: cli.port,
			root: paths.dest
		});
});

gulp.task('watchDest', function () {
	plug
		.watch(paths.all)
		.pipe(plug.connect.reload());
});
