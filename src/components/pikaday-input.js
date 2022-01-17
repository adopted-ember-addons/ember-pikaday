import { isEmpty } from '@ember/utils';
import Component from '@ember/component';
import PikadayMixin from '../mixins/pikaday';

export default Component.extend(PikadayMixin, {
  tagName: 'input',

  attributeBindings: [
    'readonly',
    'tabindex',
    'disabled',
    'placeholder',
    'type',
    'name',
    'size',
    'required',
    'title',
    'hidden',
    'autocomplete',
  ],

  type: 'text',
  autocomplete: 'off',

  didInsertElement() {
    this._super(...arguments);
    this.set('field', this.element);
    this.setupPikaday();
  },

  onPikadayOpen() {
    this.onOpen();
  },

  onPikadayClose() {
    if (this.pikaday.getDate() === null || isEmpty(this.element.value)) {
      this.set('value', null);
      this.onSelection(null);
    }

    this.onClose();
  },
});
