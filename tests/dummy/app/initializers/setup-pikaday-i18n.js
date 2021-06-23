import EmberObject from '@ember/object';
import { Info } from 'luxon';

export default {
  name: 'setup-pikaday-i18n',
  initialize() {
    const i18n = EmberObject.extend({
      previousMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      months: Info.months(),
      weekdays: Info.weekdays(),
      weekdaysShort: Info.weekdays('short')
    });

    const container = arguments[0];
    const application = arguments[1] || container;

    container.register('pikaday-i18n:main', i18n, { singleton: true });
    application.inject('component:pikaday-input', 'i18n', 'pikaday-i18n:main');
    application.inject(
      'component:pikaday-inputless',
      'i18n',
      'pikaday-i18n:main'
    );
  }
};
