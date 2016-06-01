/**
 * # Styles
 *
 *     foo.css ━┓
 *     bar.css ━┫
 *              ┗━ postcss
 *                 ┗━ import
 *                    ┗━ apply
 *                       ┗━ url
 *                          ┗━ cssnext
 *                             ┗━ cssnano ━┓
 *                                         ┣━ foo.css
 *                                         ┣━ foo.css.map
 *                                         ┣━ bar.css
 *                                         ┗━ bar.css.map
 */

import { read, write } from 'spiff';
import path from 'path';

import postcss from 'postcss';
import postcssApply from 'postcss-apply';
import postcssImport from 'postcss-import';
import postcssNano from 'cssnano';
import postcssNext from 'postcss-cssnext';
import postcssUrl from 'postcss-url';

export async function styles(options = {}) {
	const bundler = postcss([
		postcssImport({
			path: 'src',
		}),
		postcssApply(),
		postcssUrl(),
		postcssNext({
			warnForDuplicates: false,
			browsers: [
				'last 2 versions',
				'ie >= 9',
			],
		}),
		postcssNano({
			autoprefixer: false,
		}),
	]);

	async function transpile(fileObj) {
		const results = await bundler.process(fileObj.contents, {
			from: path.join('src', fileObj.relative),
			to: path.join('dist', fileObj.relative),
			map: options.maps && { inline: false },
		});

		fileObj.contents = results.css;
		fileObj.sourceMap = results.map;

		return fileObj;
	}

	return read('src/asset*/styles/*.css')
		.map(transpile)
		.map(write('dist', {
			map: options.maps
		}));
}
