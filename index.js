/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-pikaday',

  included: function(app) {
    // When ember-pikaday is used in another addon we have to do some work
    // upfront. See this issue for more information:
    // https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this._super.included(app);

    const options = app.options.emberPikaday || {};
    if (!options.excludePikadayAssets) {
      app.import(app.bowerDirectory + '/pikaday/pikaday.js');
      app.import(app.bowerDirectory + '/pikaday/css/pikaday.css');
    }
  }
};
