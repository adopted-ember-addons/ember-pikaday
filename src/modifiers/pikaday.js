import { registerDestructor } from '@ember/destroyable';
import Modifier from 'ember-modifier';
import makePikaday from '../../vendor/pikaday';
import { maybeFindMoment } from '../find-moment';
const Pikaday = makePikaday(maybeFindMoment());

export default class PikadayModifier extends Modifier {
  #pikaday;
  #observer;

  constructor(owner, args) {
    super(owner, args);

    registerDestructor(this, () => {
      this.#pikaday.destroy();
      this.#observer.disconnect();
    });
  }

  getPikadayOptions(element, positional, named) {
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
    return opts;
  }

  modify(element, positional, named) {
    const pikadayOptions = this.getPikadayOptions(element, positional, named);

    if (!this.#pikaday) {
      this.#pikaday = new Pikaday(pikadayOptions);
      let { value, register } = named;
      if (value) {
        this.#pikaday.setDate(value, true);
      }
      this.syncDisabled(element);
      this.#observer = new MutationObserver(() => this.syncDisabled(element));
      this.#observer.observe(element, { attributes: true });
      register?.(this.#pikaday);
    } else {
      let { value } = named;

      this.#pikaday.setDate(value, true);
      this.#pikaday.config(pikadayOptions);
    }
  }

  syncDisabled(element) {
    if (element.hasAttribute('disabled')) {
      this.#pikaday.hide();
    }
  }
}
