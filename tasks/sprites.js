/**
 * # Sprites
 *
 *     foo.svg ━┓
 *     bar.svg ━┫
 *              ┗━ svgo
 *                 ┗━ svgstore ━┓
 *                              ┗━ sprites.svg
 */

import { file, read, write } from 'spiff';

import Svgo from 'svgo';
import svgstore from 'svgstore';

export async function sprites() {
	const svgo = new Svgo();

	async function concatSprites(store, fileObj) {
		const svg = await new Promise(cb =>
			svgo.optimize(fileObj.contents, cb)
		);

		return store
			.add(fileObj.stem, svg.data);
	}

	function createSpriteSheet(store) {
		return file({
			path: 'assets/sprites/sheet.svg',
			contents: store.toString()
		});
	}

	return read('src/asset*/sprites/**/*.svg')
		.reduce(concatSprites, svgstore())
		.then(createSpriteSheet)
		.then(write('dist'));
}
