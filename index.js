module.exports = {
  name: 'ember-pikaday',
  included: function(app) {
    app.import('bower_components/momentjs/moment.js');
    app.import('bower_components/pikaday/pikaday.js');
    app.import('bower_components/pikaday/css/pikaday.css');
  }
};
