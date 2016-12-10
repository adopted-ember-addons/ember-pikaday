import Ember from 'ember';
import PikadayMixin from 'ember-pikaday/mixins/pikaday';
import layout from 'ember-pikaday/templates/pikaday-inputless';

export default Ember.Component.extend(PikadayMixin, {
  layout,

  didInsertElement() {
    this.set('field', this.$('.ember-pikaday-input')[0]);
    this.set('pikadayContainer', this.$('.ember-pikaday-container')[0]);
    this.setupPikaday();
  },

  onPikadayOpen() {},
  onPikadayClose() {},
});
