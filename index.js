/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-pikaday',

  included: function(app) {
    this._super.included.apply(this, arguments);

    var host = this._findHost();
    var options = host.options.emberPikaday || {};
    if (!options.excludePikadayAssets) {
      this.import(host.bowerDirectory + '/pikaday/pikaday.js');
      this.import(host.bowerDirectory + '/pikaday/css/pikaday.css');
    }
  }
};
