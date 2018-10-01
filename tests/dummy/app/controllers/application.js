/* eslint no-console: 0 */
import Controller from '@ember/controller';

export default Controller.extend({
  startDate: new Date(),
  today: new Date(),
  actions: {
    clearStartDate: function() {
      this.set('startDate', null);
    },
    doSomethingWithSelectedValue(value) {
      console.log(value);
    }
  }
});
