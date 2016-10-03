/* globals Pikaday */
import Ember from 'ember';
import moment from 'moment';

const { isPresent } = Ember;
const assign = Ember.assign || Ember.merge

export default Ember.Mixin.create({
  _options: Ember.computed('options', 'i18n', {
    get() {
      let options = this._defaultOptions();

      if (isPresent(this.get('i18n'))) {
        options.i18n = this.get('i18n');
      }
      if (isPresent(this.get('position'))) {
        options.position = this.get('position');
      }
      if (isPresent(this.get('reposition'))) {
        options.reposition = this.get('reposition');
      }

      assign(options, this.get('options') || {});
      return options;
    }
  }),

  _defaultOptions() {
    const firstDay = this.get('firstDay');

    return {
      field: this.get('field'),
      container: this.get('pikadayContainer'),
      bound: this.get('pikadayContainer') ? false : true,
      onOpen: Ember.run.bind(this, this.onPikadayOpen),
      onClose: Ember.run.bind(this, this.onPikadayClose),
      onSelect: Ember.run.bind(this, this.onPikadaySelect),
      onDraw: Ember.run.bind(this, this.onPikadayRedraw),
      firstDay: (typeof firstDay !== 'undefined') ? parseInt(firstDay, 10) : 1,
      format: this.get('format') || 'DD.MM.YYYY',
      yearRange: this.determineYearRange(),
      minDate: this.get('minDate') || null,
      maxDate: this.get('maxDate') || null,
      theme: this.get('theme') || null
    };
  },

  didUpdateAttrs({ newAttrs }) {
    this._super(...arguments);
    this.setPikadayDate();
    this.setMinDate();
    this.setMaxDate();

    if(newAttrs.options) {
      this._updateOptions();
    }
  },

  didRender() {
    this._super(...arguments);
    this.autoHideOnDisabled();
  },

  setupPikaday() {
    let pikaday = new Pikaday(this.get('_options'));

    this.set('pikaday', pikaday);
    this.setPikadayDate();
  },

  willDestroyElement() {
    this.get('pikaday').destroy();
  },

  setPikadayDate: function() {
    const format = 'YYYY-MM-DD';
    const value = this.get('value');

    if (!value) {
      this.get('pikaday').setDate(value, true);
    } else {
      const date = this.get('useUTC') ? moment(moment.utc(value).format(format), format).toDate() : value;

      this.get('pikaday').setDate(date, true);
    }
  },

  setMinDate: function() {
    if (this.get('minDate')) {
      this.get('pikaday').setMinDate(this.get('minDate'));
    }
  },

  setMaxDate: function() {
    if (this.get('maxDate')) {
      this.get('pikaday').setMaxDate(this.get('maxDate'));
    }
  },

  onOpen: Ember.K,
  onClose: Ember.K,
  onSelection: Ember.K,
  onDraw: Ember.K,

  onPikadaySelect: function() {
    this.userSelectedDate();
  },

  onPikadayRedraw: function() {
    this.get('onDraw')();
  },

  userSelectedDate: function() {
    var selectedDate = this.get('pikaday').getDate();

    if (this.get('useUTC')) {
      selectedDate = moment.utc([selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()]).toDate();
    }

    this.get('onSelection')(selectedDate);
  },

  determineYearRange: function() {
    var yearRange = this.get('yearRange');

    if (yearRange) {
      if (yearRange.indexOf(',') > -1) {
        var yearArray = yearRange.split(',');

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

  autoHideOnDisabled() {
    if (this.get('disabled') && this.get('pikaday')) {
      this.get('pikaday').hide();
    }
  },

  _updateOptions() {
    this.get('pikaday').config(this.get('_options'));
  }
});
