/* globals Pikaday, moment */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['readonly', 'disabled'],

  setupPikaday: function() {
    var that = this;

    var options = {
      field: this.$()[0],
      onSelect: function() {
        Ember.run(function() {
          that.userSelectedDate();
        });
      },
      onClose: function() {
        Ember.run(function() {
          if (this.get('pikaday').getDate() === null) {
            this.set('value', null);
          }
        }.bind(this));
      }.bind(this),
      firstDay: 1,
      format: this.get('format') || 'DD.MM.YYYY',
      yearRange: that.determineYearRange(),
      minDate: that.get('minDate'),
      maxDate: that.get('maxDate')
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

    if (this.get('useUTC')) {
      selectedDate = moment.utc([selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()]).toDate();
    }

    this.set('value', selectedDate);
  },

  setDate: function() {
    this.get('pikaday').setDate(this.get('value'), true);
  }.observes('value'),

  determineYearRange: function() {
    var yearRange = this.get('yearRange');

    if (yearRange) {
      if (yearRange.indexOf(',') > -1) {
        var yearArray =  yearRange.split(',');

        if (yearArray[1] === 'currentYear') {
          yearArray[1] = new Date().getFullYear();
        }

        return yearArray;
      } else {
        return yearRange;
      }
    } else {
      return 10;
    }
  },

  setMinDate: function () {
    this.get('pikaday').setMinDate(this.get('minDate'), true);
  }.observes('minDate'),

  setMaxDate: function () {
    this.get('pikaday').setMaxDate(this.get('maxDate'), true);
  }.observes('maxDate')
});
