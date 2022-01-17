import Modifier from 'ember-modifier';
import makePikaday from '../../vendor/pikaday';
import { momentOrMomentTimezone as moment } from '../find-moment';
const Pikaday = makePikaday(moment);

export default class PikadayModifier extends Modifier {
  #pikaday;
  #observer;

  didInstall() {
    let opts = {
      field: this.element,
      ...this.args.named,
    };
    if (!opts.i18n) {
      delete opts.i18n;
    }
    this.#pikaday = new Pikaday(opts);
    this.#pikaday.setDate(this.args.named.value, true);
    this.#observer = new MutationObserver(this.sawMutation.bind(this));
    this.#observer.observe(this.element, { attributes: true });
  }

  didUpdateArguments() {
    this.#pikaday.setMinDate(this.args.named.minDate);
    this.#pikaday.setMaxDate(this.args.named.maxDate);
    this.#pikaday.setDate(this.args.named.value, true);
  }

  willDestroy() {
    this.#pikaday.destroy();
    this.#observer.disconnect();
  }

  sawMutation() {
    if (this.element.hasAttribute('disabled')) {
      this.#pikaday.hide();
    }
  }
}
