/* eslint-disable ember/no-new-mixins */

import Mixin from '@ember/object/mixin';

import { assign } from '@ember/polyfills';
import { isPresent } from '@ember/utils';
import { run, next } from '@ember/runloop';
import { getProperties, computed } from '@ember/object';
import { momentOrMomentTimezone as moment } from '../find-moment';

import makePikaday from '../../vendor/pikaday';
const Pikaday = makePikaday(moment);

export default Mixin.create({
  _options: computed('i18n.t', 'options', 'position', 'reposition', {
    get() {
      const options = this._defaultOptions();

      if (isPresent(this.i18n)) {
        if (isPresent(this.i18n.t)) {
          options.i18n = {
            previousMonth: this.i18n.t('previousMonth').toString(),
            nextMonth: this.i18n.t('nextMonth').toString(),
            months: this.i18n.t('months').toString().split(','),
            weekdays: this.i18n.t('weekdays').toString().split(','),
            weekdaysShort: this.i18n.t('weekdaysShort').toString().split(','),
          };
        } else {
          options.i18n = this.i18n;
        }
      }
      if (isPresent(this.position)) {
        options.position = this.position;
      }
      if (isPresent(this.reposition)) {
        options.reposition = this.reposition;
      }

      assign(options, this.options || {});
      return options;
    },
  }),

  _defaultOptions() {
    const firstDay = this.firstDay;

    return {
      field: this.field,
      container: this.pikadayContainer,
      bound: this.pikadayContainer ? false : true,
      onOpen: run.bind(this, this.onPikadayOpen),
      onClose: run.bind(this, this.onPikadayClose),
      onSelect: run.bind(this, this.onPikadaySelect),
      onDraw: run.bind(this, this.onPikadayRedraw),
      firstDay: typeof firstDay !== 'undefined' ? parseInt(firstDay, 10) : 1,
      format: this.format || 'DD.MM.YYYY',
      yearRange: this.determineYearRange(),
      minDate: this.minDate || null,
      maxDate: this.maxDate || null,
      defaultDate: this.defaultDate || null,
      setDefaultDate: !!this.defaultDate,
      theme: this.theme || null,
    };
  },

  /**
   * When updating attrs, we need to reset some things in case they've changed.
   * @public
   * @memberOf {Mixins.Pikaday}
   * @return {undefined}
   */
  didUpdateAttrs() {
    this._super();
    this.set(
      'cancelToken',
      run.later(() => {
        // Do not set or update anything when the component is destroying.
        if (this.isDestroying || this.isDestroyed) {
          return;
        }

        this.setMinDate();
        this.setMaxDate();
        this.setPikadayDate();

        if (this.options) {
          this._updateOptions();
        }
      })
    );
  },

  didRender() {
    this._super();
    this.autoHideOnDisabled();
  },

  setupPikaday() {
    const pikaday = new Pikaday(this._options);

    if (this.defaultDate) {
      this.set('value', this.defaultDate);
    }

    this.set('pikaday', pikaday);
    this.setPikadayDate();
  },

  willDestroyElement() {
    this._super();
    this.pikaday.destroy();
    run.cancel(this.cancelToken);
  },

  setPikadayDate() {
    const format = 'YYYY-MM-DD';
    const value = this.value;

    if (!value) {
      this.pikaday.setDate(value, true);
    } else {
      const date = this.useUTC
        ? moment(moment.utc(value).format(format), format).toDate()
        : value;

      this.pikaday.setDate(date, true);
    }
  },

  setMinDate() {
    const { pikaday, minDate, value } = getProperties(this, [
      'pikaday',
      'minDate',
      'value',
    ]);

    if (minDate) {
      const _minDate = new Date(minDate.getTime());
      pikaday.setMinDate(_minDate);

      // If the current date is lower than minDate we set date to minDate
      next(() => {
        if (value && moment(value, this.format).isBefore(minDate, 'day')) {
          pikaday.setDate(minDate);
        }
      });
    } else {
      pikaday.setMinDate(null);
    }
  },

  setMaxDate() {
    const { pikaday, maxDate, value } = getProperties(this, [
      'pikaday',
      'maxDate',
      'value',
    ]);

    if (maxDate) {
      const _maxDate = new Date(maxDate.getTime());
      pikaday.setMaxDate(_maxDate);

      // If the current date is greater than maxDate we set date to maxDate
      next(() => {
        if (value > maxDate) {
          pikaday.setDate(maxDate);
        }
      });
    } else {
      pikaday.setMaxDate(null);
    }
  },

  onOpen() {},
  onClose() {},
  onSelection() {},
  onDraw() {},

  onPikadaySelect() {
    this.userSelectedDate();
  },

  onPikadayRedraw() {
    this.onDraw();
  },

  userSelectedDate() {
    let selectedDate = this.pikaday.getDate();

    if (this.useUTC) {
      selectedDate = moment
        .utc([
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
        ])
        .toDate();
    }

    this.onSelection(selectedDate);
  },

  determineYearRange() {
    const yearRange = this.yearRange;

    if (yearRange) {
      if (yearRange.indexOf(',') > -1) {
        const yearArray = yearRange.split(',');

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
    if (this.disabled && this.pikaday) {
      this.pikaday.hide();
    }
  },

  _updateOptions() {
    this.pikaday.config(this._options);
  },
});
