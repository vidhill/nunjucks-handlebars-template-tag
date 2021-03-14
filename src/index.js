import path from 'path';
import nunjucks from 'nunjucks';
import logger from './logger';

const joinNewlines = (...parts) => parts.join('\n');

function IncludeHandlebarsTemplate() {
    this.tags = ['includeHandleBarsTemplate'];

    this.parse = function (parser, nodes) {
        // get the tag token
        const tok = parser.nextToken();

        // parse the args and move after the block end. passing true
        // as the second arg is required if there are no parentheses
        const args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        return new nodes.CallExtension(this, 'run', args, []);
    };

    this.run = function (context, filePath) {
        const loadedArr = context.env.loaders.map((loader) =>
            loader.getSource(filePath)
        );

        const loaded = loadedArr.find((i) => i.src !== undefined);

        const fileInfo = path.parse(filePath);

        if (loaded === null) {
            return logger.warn(`File at path '${filePath}' not found`);
        }

        const html = joinNewlines(
            `<script id="${fileInfo.name}" type="text/x-handlebars-template">`,
            loaded.src,
            `</script>`
        );

        return context.env.filters.safe(html);
    };
}

export { IncludeHandlebarsTemplate };
