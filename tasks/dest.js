import cli from './util/cli';
import del from 'del';
import env from './util/env';
import gulp from 'gulp';
import plug from './util/plug';

let paths = {
	dest: env.getDestPath(),
	deploy: env.getDestPath('**/{*,.*}'),
	watch: env.getDestPath('**')
};

gulp.task('cleanDest', function (done) {
	del(paths.dest, done);
});

gulp.task('deployDest', function () {
	return gulp
		.src(paths.deploy)
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

	if (cli.watch) {
		plug
			.watch(paths.watch)
			.pipe(plug.connect.reload());
	}
});
