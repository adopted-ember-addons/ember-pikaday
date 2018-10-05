import EmberObject from '@ember/object';
import moment from 'moment';

export default {
  name: 'setup-pikaday-i18n',
  initialize() {
    const i18n = EmberObject.extend({
      previousMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      months: moment.localeData()._months,
      weekdays: moment.localeData()._weekdays,
      weekdaysShort: moment.localeData()._weekdaysShort
    });

    const container = arguments[0];
    const application = arguments[1] || container;

    container.register('pikaday-i18n:main', i18n, { singleton: true });
    application.inject('component:pikaday-input', 'i18n', 'pikaday-i18n:main');
  }
};
