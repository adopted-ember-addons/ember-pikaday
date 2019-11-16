/* eslint-env node */
'use strict';

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);

    const addonOptions =
      (this.app.options && this.app.options.emberPikaday) || {};

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
