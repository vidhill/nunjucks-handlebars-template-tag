# nunjucks-handlebars-template
Nunjucks custom tag to include handlebar templates

```
$ npm install nunjucks-handlebars-template-tag --save
```

## Setup
```javascript
const nunjucks = require('nunjucks');
const { IncludeHandlebarsTemplate } = require('nunjucks-handlebars-template-tag');

const fileSystem = new nunjucks.FileSystemLoader('views');

const env = new nunjucks.Environment(fileSystem);

env.addExtension('IncludeHandlebarsTemplate', new IncludeHandlebarsTemplate());
```

## Usage

```javascript
  {% includeHandleBarsTemplate "includes/my-template.handlebars" %}
```

### Outputs
```html
<script id="my-template" type="text/x-handlebars-template">
    // raw content of includes/my-template.handlebars
</script>
```
**Note** the `id` of the script matches the filename of the included file