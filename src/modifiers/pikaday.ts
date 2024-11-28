import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';
import Modifier, { type ArgsFor } from 'ember-modifier';
import makePikaday from '../../vendor/pikaday';
import { maybeFindMoment } from '../find-moment';
const Pikaday = makePikaday(maybeFindMoment());

interface Positional {}
interface Named {}
interface Options {}

interface PikadaySignature {
  Element: HTMLElement;
  Args: {
    Positional: Positional;
    Named: Named;
  };
}

export default class PikadayModifier extends Modifier<PikadaySignature> {
  #pikaday: typeof Pikaday | null = null;
  #observer: MutationObserver | null = null;

  constructor(owner: Owner, args: ArgsFor<PikadaySignature>) {
    super(owner, args);

    registerDestructor(this, () => {
      this.#pikaday?.destroy();
      this.#observer?.disconnect();
    });
  }

  getPikadayOptions(
    element: HTMLElement,
    positional: Positional,
    named: Named,
  ): Options {
    const opts = {
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

  modify(element: HTMLElement, positional: Positional, named: Named) {
    const pikadayOptions = this.getPikadayOptions(element, positional, named);

    if (!this.#pikaday) {
      this.#pikaday = new Pikaday(pikadayOptions);
      const { value, register } = named;
      if (value) {
        this.#pikaday.setDate(value, true);
      }
      this.syncDisabled(element);
      this.#observer = new MutationObserver(() => this.syncDisabled(element));
      this.#observer.observe(element, { attributes: true });
      register?.(this.#pikaday);
    } else {
      const { value } = named;

      this.#pikaday.setDate(value, true);
      this.#pikaday.config(pikadayOptions);
    }
  }

  syncDisabled(element: HTMLElement) {
    if (element.hasAttribute('disabled')) {
      this.#pikaday?.hide();
    }
  }
}
