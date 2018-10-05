/* eslint no-console: 0 */
import Controller from '@ember/controller';

export default Controller.extend({
  startDate: undefined,
  today: undefined,

  isMinDateSet: true,
  isMaxDateSet: true,

  init() {
    this._super(...arguments);

    this.set('startdate', new Date());
    this.set('today', new Date());
  },

  actions: {
    clearStartDate() {
      this.set('startDate', null);
    },
    doSomethingWithSelectedValue(value) {
      console.log(value);
    }
  }
});
