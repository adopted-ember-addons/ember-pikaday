import $ from 'jquery';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

var application;

module('Acceptance | Basic smoke test', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    run(application, 'destroy');
  }
});

test('render datepickers', function(assert) {
  visit('/');

  andThen(function() {
    assert.ok($('body').text().match(/Welcome to Ember\.js/));
  });
});
