/**
 * # Scripts
 *
 *     foo.js ━┓
 *     bar.js ━┫
 *             ┗━ browserify-incremental
 *                ┗━ babelify
 *                   ┗━ errorify ━┓
 *                                ┣━ foo.js
 *                                ┣━ foo.js.map
 *                                ┣━ bar.js
 *                                ┗━ bar.js.map
 */

import { read, write } from 'spiff';

import browserify from 'browserify-incremental';
import babelify from 'babelify';
import errorify from 'errorify';

export async function scripts(options = {}) {
	async function transpile(fileObj) {
		const chunks = [];
		const bundler = browserify(fileObj.path, {
			transform: [babelify],
			plugin: [errorify],
			debug: options.maps,
		});

		await new Promise((resolve, reject) => {
			bundler
				.bundle()
				.on('data', chunk => chunks.push(chunk))
				.on('finish', resolve)
				.on('error', reject);
		});

		fileObj.contents = Buffer.concat(chunks)

		return fileObj;
	}

	return read('src/asset*/scripts/*.js')
		.map(transpile)
		.map(write('dist', {
			map: options.maps
		}));
}
