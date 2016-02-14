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
	del(paths.dest, done);
});

gulp.task('deployDest', function () {
	let ftp = require('vinyl-ftp'),
		transmit = ftp.create({
			host: env.FTP_HOST,
			user: env.FTP_USERNAME,
			password: env.FTP_PASSWORD
		});

	if (!env.FTP_HOST) {
		return;
	}

	return gulp
		.src(paths.deploy, { base: paths.dest, buffer: false })
		.pipe(transmit.newer('/html'))
		.pipe(transmit.dest('/html'));
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
