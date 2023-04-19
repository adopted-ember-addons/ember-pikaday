import Modifier from 'ember-modifier';
import makePikaday from '../../vendor/pikaday';
import { maybeFindMoment } from '../find-moment';
import { registerDestructor } from '@ember/destroyable';
const Pikaday = makePikaday(maybeFindMoment());

export default class PikadayModifier extends Modifier {
  #pikaday;
  #observer;

  #element;

  modify(element, positional, named) {
    this.#element = element;

    let opts = {
      // Our element is Pikaday's field
      field: element,

      // All other named arguments go through to Pikaday
      ...named,

      // We also optionally accept a bag of arguments as the first positional
      // argument, because it's hard to do argument splatting in hbs. These are
      // taking precedence over the named arguments.
      ...positional[0],
    };

    if (!opts.i18n) {
      // Pikaday doesn't like it if you pass an empty value for i18n, whereas
      // it's hard in HBS to conditionally include a named argument, so we
      // drop it here.
      delete opts.i18n;
    }

    let firstTime = false; // use this to know if should update config because there is one method not an install and update
    if (!this.#pikaday) {
      firstTime = true;
      this.#pikaday = new Pikaday(opts);
      this.#observer = new MutationObserver(this.syncDisabled.bind(this));
      this.#observer.observe(element, { attributes: true });
      registerDestructor(this, () => {
        this.#pikaday.destroy();
        this.#observer.disconnect();
      });
    }

    this.syncDisabled();

    let { value, minDate, maxDate } = named;
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

    if (value) {
      this.#pikaday.setDate(value, !valueAltered);
    }

    if (!firstTime) {
      this.#pikaday.config(opts);
    }
  }

  syncDisabled() {
    if (this.#element.hasAttribute('disabled')) {
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
