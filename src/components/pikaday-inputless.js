import Component from '@ember/component';
import PikadayMixin from '../mixins/pikaday';

export default Component.extend(PikadayMixin, {
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
