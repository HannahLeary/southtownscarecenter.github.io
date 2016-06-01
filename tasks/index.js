import path from 'path';
import ygor from 'ygor';

import { clean } from './clean';
import { markup } from './markup';
import { styles } from './styles';
import { scripts } from './scripts';
import { sprites } from './sprites';
import { statics } from './statics';
import { serve } from './serve';

async function build(options) {
	await clean(options);

	await Promise.all([
		markup(options),
		styles(options),
		scripts(options),
		sprites(options),
		statics(options),
	]);
}

export default ygor
	.task('default', build)
	.task('build', build)
	.task('clean', clean)
	.task('markup', markup)
	.task('styles', styles)
	.task('scripts', scripts)
	.task('sprites', sprites)
	.task('statics', statics);
