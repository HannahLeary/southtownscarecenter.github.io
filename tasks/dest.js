import cli from './util/cli';
import del from 'del';
import env from './util/env';
import gulp from 'gulp';
import plug from './util/plug';

let isServing = false,
	isWatching = false,
	paths = {
		dest: env.getDestPath(),
		deploy: env.getDestPath('**/{*,.*}'),
		watch: env.getDestPath('**')
	};

gulp.task('cleanDest', function (done) {
	del(paths.dest, function (err) {
		console.log(err);
		done();
	});
});

gulp.task('deployDest', function () {
	return gulp
		.src(paths.deploy)
		.pipe(plug.ghPages({
			branch: 'master'
		}));
});

gulp.task('serveDest', function () {
	if (!isServing) {
		isServing = true;

		plug.connect
			.server({
				livereload: cli.watch,
				port: cli.port,
				root: paths.dest
			});
	}

	if (!isWatching && cli.watch) {
		isWatching = true;

		plug
			.watch(paths.watch)
			.pipe(plug.connect.reload());
	}
});
