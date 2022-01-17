import Component from '@ember/component';
import PikadayMixin from '../mixins/pikaday';
import layout from '../templates/pikaday-inputless.hbs';

export default Component.extend(PikadayMixin, {
  layout,

  didInsertElement() {
    this._super(...arguments);
    this.set('field', this.element.querySelector('.ember-pikaday-input'));
    this.set(
      'pikadayContainer',
      this.element.querySelector('.ember-pikaday-container')
    );
    this.setupPikaday();
  },

  onPikadayOpen() {},
  onPikadayClose() {},
});
