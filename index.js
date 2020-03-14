/* eslint-env node */
'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    let current = this;
    //Get the top most application where config will reside
    //ref: _findHost https://git.io/Jvi0N
    do {
      app = current.app || app;
    } while (current.parent.parent && (current = current.parent));

    const addonOptions = (app.options && app.options.emberPikaday) || {};

    const dependencies = Object.keys(this.project.dependencies());
    const hasFastboot = dependencies.includes('ember-cli-fastboot');

    const importOptions = {};
    if (hasFastboot) {
      importOptions.using = [{ transformation: 'fastbootShim' }];
    }

    this.import('node_modules/pikaday/pikaday.js', importOptions);
    if (!addonOptions.excludePikadayAssets) {
      this.import('node_modules/pikaday/css/pikaday.css');
    }
  }
};
