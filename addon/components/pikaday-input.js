import { isEmpty } from '@ember/utils';
import Component from '@ember/component';
import PikadayMixin from 'ember-pikaday/mixins/pikaday';

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
    'autocomplete'
  ],

  type: 'text',
  autocomplete: 'off',

  didInsertElement() {
    this.set('field', this.element);
    this.setupPikaday();
  },

  onPikadayOpen() {
    this.get('onOpen')();
  },

  onPikadayClose() {
    if (this.get('pikaday').getDate() === null || isEmpty(this.$().val())) {
      this.set('value', null);
      this.get('onSelection')(null);
    }

    this.get('onClose')();
  }
});
