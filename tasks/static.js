import cli from './util/cli';
import env from './util/env';
import fs from './util/fs';
import plug from './util/plug';
import gulp from 'gulp';
import path from 'path';

let isWatching = false,
	paths = {
		src: [
			env.getSrcPath('assets/media/{fonts,images}/*.*'),
			env.getSrcPath('assets/scripts/config.js'),
			env.getSrcPath('assets/vendor/{es6-module-loader,system}.js'),
			env.getSrcPath('CNAME')
		],
		svg: env.getSrcPath('assets/media/images/icons/*.svg'),
		watch: env.getSrcPath('assets/media/**'),
		dest: env.getDestPath()
	};

gulp.task('buildStatic:copy', function () {
	return fs
		.src(paths.src)
		.pipe(fs.dest(paths.dest));
});

gulp.task('buildStatic:svg', function () {
	function minify(file) {
		var prefix = path.basename(
			file.relative,
			path.extname(file.relative)
		);

		return {
			plugins: [
				{ removeUselessStrokeAndFill: true },
				{ cleanupIDs: { prefix: prefix + '-', minify: true } }
			]
		};
	}

	return fs
		.src(paths.svg)
		.pipe(plug.svgmin(minify))
		.pipe(plug.svgstore())
		.pipe(plug.rename('assets/media/images/icons.svg'))
		.pipe(fs.dest(paths.dest));
});

gulp.task('buildStatic', ['buildStatic:copy', 'buildStatic:svg'], function () {
	if (!isWatching && cli.watch) {
		isWatching = true;

		gulp.watch(paths.watch, ['buildStatic']);
	}
});

