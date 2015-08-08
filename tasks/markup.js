import cli from './util/cli';
import env from './util/env';
import fs from './util/fs';
import gulp from 'gulp';
import plug from './util/plug';

let isWatching = false,
	paths = {
		src: [env.getSrcPath('**/*.html'), '!**/assets/**'],
		partials: env.getSrcPath('assets/partials/**/*.hbs'),
		dest: env.getDestPath()
	};

gulp.task('buildMarkup', function () {
	if (cli.watch && !isWatching) {
		isWatching = true;
		gulp.watch(paths.src, ['buildMarkup']);
		gulp.watch(paths.partials, ['buildMarkup']);
	}

	return fs
		.src(paths.src)
		.pipe(plug.frontMatter({
			property: 'meta'
		}))
		.pipe(plug.hb({
			bustCache: cli.watch,
			debug: cli.debug,
			data: [
				env.getSrcPath('assets/data/**/*')
			],
			helpers: [
				env.getNpmPath('handlebars-layouts/index.js')
			],
			partials: [
				paths.partials
			]
		}))
		.pipe(plug.prettify({
			/* eslint-disable camelcase */
			extra_liners: [],
			indent_inner_html: false,
			indent_char: '\t',
			indent_size: 1,
			max_preserve_newlines: 1,
			preserve_newlines: true,
			wrap_line_length: 999999
			/* eslint-enable camelcase */
		}))
		.pipe(fs.dest(paths.dest));
});
