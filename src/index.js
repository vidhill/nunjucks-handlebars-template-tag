import path from 'path';
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
        const { env } = context;
        const { filters, loaders } = env;
        const loadedContentArr = loaders.map((loader) =>
            loader.getSource(filePath)
        );

        const loadedContent = loadedContentArr.find(
            (item) => item.src !== undefined
        );

        const fileInfo = path.parse(filePath);

        if (loadedContent === null) {
            return logger.warn(`File at path '${filePath}' not found`);
        }

        const html = joinNewlines(
            `<script id="${fileInfo.name}" type="text/x-handlebars-template">`,
            loadedContent.src,
            `</script>`
        );

        return filters.safe(html);
    };
}

export { IncludeHandlebarsTemplate };
