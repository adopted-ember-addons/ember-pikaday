import Ember from 'ember';
import PikadayMixin from 'ember-pikaday/mixins/pikaday';

export default Ember.Component.extend(PikadayMixin, {
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
    'hidden'
  ],

  type: 'text',

  didInsertElement() {
    this.set('field', this.element);
    this.setupPikaday();
  },

  onPikadayOpen: function() {
    this.get('onOpen')();
  },

  onPikadayClose: function() {
    if (this.get('pikaday').getDate() === null || Ember.isEmpty(this.$().val())) {
      this.set('value', null);
      this.get('onSelection')(null);
    }

    this.get('onClose')();
  },
});

