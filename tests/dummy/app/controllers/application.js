/* eslint no-console: 0 */
import Controller from '@ember/controller';

export default Controller.extend({
  startDate: undefined,
  today: undefined,

  init() {
    this._super(...arguments);

    this.set('startdate', new Date());
    this.set('today', new Date());
  },

  actions: {
    clearStartDate: function() {
      this.set('startDate', null);
    },
    doSomethingWithSelectedValue(value) {
      console.log(value);
    }
  }
});
