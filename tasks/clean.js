/**
 * # Clean
 *
 *     dist/ ━┓
 *            ┗━ ━┓
 *                ┗━ trash
 */
import { remove } from 'spiff';

export async function clean() {
	return remove('dist');
}
