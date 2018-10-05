/* eslint-env node */
'use strict';
const fastbootTransform = require('fastboot-transform');

module.exports = {
  name: require('./package').name,

  options: {
    nodeAssets: {
      pikaday: {
        vendor: ['pikaday.js', 'css/pikaday.css'],
        processTree(input) {
          return fastbootTransform(input);
        }
      }
    }
  },
  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/pikaday/pikaday.js');
    this.import('vendor/pikaday/css/pikaday.css');
  }
};
