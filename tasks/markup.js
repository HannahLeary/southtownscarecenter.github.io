/**
 * # Markup
 *
 *     foo.html ━┓
 *     bar.html ━┫
 *               ┗━ front-matter
 *                  ┗━ handlebars-wax ━┓
 *                                     ┣━ foo.html
 *                                     ┗━ bar.html
 */

import { read, write } from 'spiff';

import handlebars from 'handlebars';
import handlebarsLayouts from 'handlebars-layouts';
import handlebarsWax from 'handlebars-wax';
import frontMatter from 'front-matter';

export async function markup() {
	const wax = handlebarsWax(handlebars.create(), { bustCache: true })
		.helpers(handlebarsLayouts)
		.partials(`src/partials/**/*.hbs`)
		.partials(`src/asset*/styles/**/*.hbs`)
		.partials(`src/asset*/scripts/**/*.hbs`);

	function transpile(fileObj) {
		const content = frontMatter(fileObj.contents);
		const template = wax.compile(content.body);

		fileObj.contents = template(content.attributes);

		return fileObj;
	}

	return read(['src/**/*.html', '!**/assets/**'])
		.map(transpile)
		.map(write('dist'));
}
