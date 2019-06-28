import Component from '@ember/component';
import PikadayMixin from 'ember-pikaday/mixins/pikaday';
import layout from 'ember-pikaday/templates/pikaday-inputless';

export default Component.extend(PikadayMixin, {
  layout,

  didInsertElement() {
    this.set('field', this.element.querySelector('.ember-pikaday-input'));
    this.set(
      'pikadayContainer',
      this.element.querySelector('.ember-pikaday-container')
    );
    this.setupPikaday();
  },

  onPikadayOpen() {},
  onPikadayClose() {}
});
