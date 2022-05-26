'use strict';

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry: function(type, registry) {
    const plugin = this._buildPlugin();

    plugin.parallelBabel = {
      requireFile: __filename,
      buildUsing: '_buildPlugin',
      params: {}
    };

    registry.add('htmlbars-ast-plugin', plugin);
  },

  _buildPlugin() {
    const VGet = require('./htmlbars-plugins/v-get');

    return {
      name: 'v-get',
      plugin: context => {
        const vGet = new VGet(context);

        return {
          name: 'v-get',
          visitor: {
            BlockStatement(node) {
              vGet.processNode(node);
            },
            MustacheStatement(node) {
              vGet.processNode(node);
            },
            ElementNode(node) {
              vGet.processNode(node);
            }
          }
        };
      },
      baseDir: function() {
        return __dirname;
      }
    };
  }
};
