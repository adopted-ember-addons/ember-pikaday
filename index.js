/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-pikaday',

  options: {
    nodeAssets: {
      pikaday: {
        import: [
          { enabled: process.env.EMBER_CLI_FASTBOOT !== 'true', path: 'pikaday.js' },
          'css/pikaday.css'
        ]
      }
    }
  }
};
