/* globals Pikaday */

import Ember from 'ember';

var moment = window.moment;

export default Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['readonly'],

  setupPikaday: function() {
    var that = this;

    var options = {
      field: this.$()[0],
      onSelect: function() {
        Ember.run(function() {
          that.userSelectedDate();
        });
      },
      firstDay: 1,
      format: this.get('format') || 'DD.MM.YYYY'
    };

    if (this.get('i18n')) {
      options.i18n = this.get('i18n');
    }

    var pikaday = new Pikaday(options);

    this.set('pikaday', pikaday);
    this.get('pikaday').setDate(this.get('value'), true);
  }.on('didInsertElement'),

  teardownPikaday: function() {
    this.get('pikaday').destroy();
  }.on('willDestroyElement'),

  userSelectedDate: function() {
    var selectedDate = this.get('pikaday').getDate();
    var utcDate = moment.utc([selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()]).toDate();
    this.set('value', utcDate);
  },

  setDate: function() {
    this.get('pikaday').setDate(this.get('value'), true);
  }.observes('value')
});
