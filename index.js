/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-pikaday',
  options: {
    nodeAssets: {
      pikaday: {
        vendor: ['pikaday.js', 'css/pikaday.css']
      }
    }
  },
  included() {
    this._super.included.apply(this, arguments);
    if (!process.env.EMBER_CLI_FASTBOOT) {
      this.import('vendor/pikaday/pikaday.js');
      this.import('vendor/pikaday/css/pikaday.css');
    }
  }
};
