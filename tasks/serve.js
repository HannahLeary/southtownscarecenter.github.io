/**
 * # Server
 *
 *     dist/ ━┓
 *            ┗━ browser-sync ━┓
 *                             ┗━ browser
 */

import browserSync from 'browser-sync';
import ygor from 'ygor';
import { debounce } from './util';

export async function serve() {
	const browser = browserSync.create();
	const reload = debounce(() => browser.reload());
	const watchOptions = {
		ignored: /[\\\/]\./,
		ignoreInitial: true,
	};

	function run(task) {
		return ygor
			.run(task)
			.then(reload);
	}

	function watch(pattern, task) {
		browser.watch(
			pattern,
			watchOptions,
			debounce(() => run(task))
		);
	}

	browser.init({
		ui: false,
		open: false,
		notify: false,
		server: './dist',
	});

	watch(`src/**/*.{hbs,html}`, 'markup');
	watch(`src/**/*.css`, 'styles');
	watch(`src/**/*.js`, 'scripts');

	return run('default');
}
