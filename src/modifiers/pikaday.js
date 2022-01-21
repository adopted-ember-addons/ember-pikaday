import Modifier from 'ember-modifier';
import makePikaday from '../../vendor/pikaday';
import { maybeFindMoment } from '../find-moment';
const Pikaday = makePikaday(maybeFindMoment());

export default class PikadayModifier extends Modifier {
  #pikaday;
  #observer;

  get pikadayOptions() {
    let opts = {
      // Our element is Pikaday's field
      field: this.element,

      // All other named arguments go through to Pikaday
      ...this.args.named,

      // We also optionally accept a bag of arguments as the first positional
      // argument, because it's hard to do argument splatting in hbs. These are
      // taking precedence over the named arguments.
      ...this.args.positional[0],
    };

    if (!opts.i18n) {
      // Pikaday doesn't like it if you pass an empty value for i18n, whereas
      // it's hard in HBS to conditionally include a named argument, so we
      // drop it here.
      delete opts.i18n;
    }
    return opts;
  }

  didInstall() {
    this.#pikaday = new Pikaday(this.pikadayOptions);
    let { value } = this.args.named;
    if (value) {
      this.#pikaday.setDate(value, true);
    }
    this.syncDisabled();
    this.#observer = new MutationObserver(this.syncDisabled.bind(this));
    this.#observer.observe(this.element, { attributes: true });
  }

  didUpdateArguments() {
    let { value, minDate, maxDate } = this.args.named;
    let valueAltered = false;
    this.#pikaday.setMinDate(copyDate(minDate));
    if (minDate && value && value < minDate) {
      value = minDate;
      valueAltered = true;
    }

    this.#pikaday.setMaxDate(copyDate(maxDate));
    if (maxDate && value && value > maxDate) {
      value = maxDate;
      valueAltered = true;
    }

    this.#pikaday.setDate(value, !valueAltered);
    this.#pikaday.config(this.pikadayOptions);
  }

  willDestroy() {
    this.#pikaday.destroy();
    this.#observer.disconnect();
  }

  syncDisabled() {
    if (this.element.hasAttribute('disabled')) {
      this.#pikaday.hide();
    }
  }
}

// apparently Pikaday mutates Dates that you pass it for minDate and maxDate. <sigh>
function copyDate(date) {
  if (date) {
    return new Date(date.getTime());
  } else {
    return date;
  }
}
