import Component from '@glimmer/component';
import { action } from '@ember/object';
import { findMoment } from '../find-moment';
const moment = findMoment();

export default class extends Component {
  constructor(owner, args) {
    super(owner, args);
  }

  get format() {
    return this.args.format || 'DD.MM.YYYY';
  }

  get value() {
    let { value, useUTC } = this.args;
    if (useUTC && value) {
      let format = 'YYYY-MM-DD';
      value = moment(moment.utc(value).format(format), format).toDate();
    }
    return value;
  }

  get yearRange() {
    const yearRange = this.args.yearRange;
    if (!yearRange) {
      return 10;
    }
    if (yearRange.indexOf(',') > -1) {
      const yearArray = yearRange.split(',');
      if (yearArray[1] === 'currentYear') {
        yearArray[1] = new Date().getFullYear();
      }
      return yearArray;
    } else {
      return yearRange;
    }
  }

  get i18n() {
    let i18n = this.args.i18n;
    if (!i18n) {
      return undefined;
    }
    if (!i18n.t) {
      return i18n;
    }
    return {
      previousMonth: i18n.t('previousMonth').toString(),
      nextMonth: i18n.t('nextMonth').toString(),
      months: i18n.t('months').toString().split(','),
      weekdays: i18n.t('weekdays').toString().split(','),
      weekdaysShort: i18n.t('weekdaysShort').toString().split(','),
    };
  }

  get firstDay() {
    return this.args.firstDay == null ? 1 : parseInt(this.args.firstDay, 10);
  }

  @action
  onClose() {
    if (this.isDestroying) {
      return;
    }
    if (!this.#heardValue) {
      this.onSelect(null);
    }
    this.args.onClose?.();
  }

  #heardValue;

  @action
  onDraw() {
    // this is here because apparently the classic behavior is to pass no
    // arguments to the onDraw callback, but Pikaday's own ownDraw has an
    // argument.
    this.args.onDraw?.();
  }

  @action
  didChange(event) {
    this.#heardValue = event.target.value;
  }

  @action
  onSelect(date) {
    if (this.args.useUTC && date) {
      date = moment
        .utc([date.getFullYear(), date.getMonth(), date.getDate()])
        .toDate();
    }
    this.args.onSelection?.(date);
  }
}
