import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

var application;

module('Acceptance | Basic smoke test', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('render datepickers', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok(Ember.$('body').text().match(/Welcome to Ember\.js/));
  });
});
