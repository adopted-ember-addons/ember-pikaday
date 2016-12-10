import Ember from 'ember';

export default Ember.Controller.extend({
  startDate: new Date(),
  actions: {
    clearStartDate: function() {
      this.set('startDate', null);
    },
    doSomethingWithSelectedValue(value) {
      console.log(value);
    }
  },

  neverGoBackDate: new Date(),
  neverGoBackMinDate: Ember.computed.readOnly('neverGoBackDate')
});
