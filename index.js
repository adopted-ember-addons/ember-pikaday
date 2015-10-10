/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-pikaday',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/pikaday/pikaday.js');
    app.import(app.bowerDirectory + '/pikaday/css/pikaday.css');
  }
};
