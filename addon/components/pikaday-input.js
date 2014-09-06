/* globals Pikaday */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',

  setupPikaday: function() {
    var that = this;

    var pikaday = new Pikaday({
      field: this.$()[0],
      onSelect: function() { that.userSelectedDate(); },
      firstDay: 1,
      format: this.get('format') || 'DD.MM.YYYY'
    });

    this.set('pikaday', pikaday);
    this.get('pikaday').setDate(this.get('value'), true);
  }.on('didInsertElement'),

  teardownPikaday: function() {
    this.get('pikaday').destroy();
  }.on('willDestroyElement'),

  userSelectedDate: function() {
    this.set('value', this.get('pikaday').getDate());
  },

  setDate: function() {
    this.get('pikaday').setDate(this.get('value'), true);
  }.observes('value')
});
