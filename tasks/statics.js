/**
 * # Statics
 *
 *     foo.woff ━┓
 *     bar.png  ━┫
 *               ┗━ ━┓
 *                   ┣━ foo.woff
 *                   ┗━ bar.png
 */

import { read, write } from 'spiff';

export async function statics() {
	return read('src/asset*/statics/**/*.*')
		.map(write('dist'));
}
