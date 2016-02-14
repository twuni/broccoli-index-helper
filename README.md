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
>     module.exports = index({
>       fileName: __filename,
>       moduleNames: ['dependencies', 'modules', 'main']
>     });
> ```
>

## Usage

### `function(options = {})`

 * `options`: Required. Should be an `object` with some of the following attributes defined:

   * `fileName`: Optional. Should be a `string`. If given, this is assumed to be the `__filename` variable of the calling file and will be used to derive an `indexName` from the last path component, excluding the file extension. Supercedes `indexName`, if given.

   * `indexName`: Optional. Should be a `string`. If given, this will be the base of the relative path used for importing the named modules via `require`.

   * `pathFunction`: Optional. Should be a `function`. If given, this function will be used to compute the base path for importing named modules via `require`. This function should accept a single `string` argument for the module name, and should return a `string` that can be provided directly to `require` for importing the named module. Supercedes `fileName` and `indexName`, if given.

   * `moduleNames`: Optional. Should be an `array` of `string` values corresponding to the module names to be merged. The modules will be merged in the given order. If `moduleNames` is provided, no other options are required.

   * `modulePaths`: Optional. Should be an `array` of `string` values corresponding to the paths of the modules to be merged, in the given order. If `modulePaths` is provided, no other options are required. Supercedes `moduleNames` and `indexName`, if given.

   * `modules`: Optional. Should be an `array` of Broccoli trees to be merged. Supercedes `modulePaths`, if given.

 * The output of this function will be a Broccoli tree resulting from merging the given modules.
