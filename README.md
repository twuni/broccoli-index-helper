# broccoli-index-helper

This Broccoli helper makes building modular Broccoli configurations a little
easier by simplifies the implementation of a common pattern -- configuring the
build pipeline for each aspect of an application separately, then merging the
resulting trees.

Consider the following directory structure:

> * /src
>   * /main
>     * /assets
>       * …
>     * /config
>       * /broccoli
>         * /assets
>           * /dependencies.js
>           * /main.js
>           * /modules.js
>         * /scripts
>           * /dependencies.js
>           * /main.js
>           * /modules.js
>         * /stylesheets
>           * /dependencies.js
>           * /main.js
>           * /modules.js
>         * /assets.js
>         * /scripts.js
>         * /stylesheets.js
>       * /broccoli.js
>     * /scripts
>       * …
>     * /stylesheets
>       * …

With this directory tree, we defer the logic for handling assets, scripts, and
stylesheets to their respective leaf nodes. The steps along the way are only
there to merge them all together, and each of these files has pretty much the
same logic:

 1. `require` each file within the directory of the same name as this file.
 2. Merge each of these trees in a specific order.

With **broccoli-index-helper**, this logic can be written as follows:

> For **/src/main/config/broccoli/assets.js**:
>
> ```
>     const index = require('broccoli-index-helper');
>     module.exports = index(__filename, ['dependencies', 'modules', 'main']);
> ```
>
