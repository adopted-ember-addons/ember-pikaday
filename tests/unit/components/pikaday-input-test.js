import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

moduleForComponent('pikaday-input', 'PikadayInputComponent');

test('is an input tag', function(assert) {
  assert.equal('INPUT', this.$().prop('tagName'));
});

test('the input tag has the readonly attribute if it has been set on the component', function(assert) {
  var component = this.subject();
  component.set('readonly', true);

  assert.ok(this.$().is('[readonly]'));
});

test('clicking the input opens the pikaday dialog', function(assert) {
  var $input = this.render();

  assert.ok($('.pika-single').hasClass('is-hidden'));
  openDatepicker($input);
  assert.ok(!$('.pika-single').hasClass('is-hidden'));
});

test('selecting a date should update the value attribute', function(assert) {
  var component = this.subject();
  var $input = this.render();
  var interactor = openDatepicker($input);

  interactor.selectDate(new Date(2013, 3, 28));

  var date = this.subject().get('value');

  assert.equal(date.getFullYear(), 2013);
  assert.equal(date.getMonth(), 3);
  assert.equal(date.getDate(), 28);
});

test('setting the value attribute should select the correct date', function(assert) {
  var $input = this.render();

  this.subject().set('value', new Date(2010, 7, 10));
  var interactor = openDatepicker($input);

  assert.equal(interactor.selectedYear(), 2010);
  assert.equal(interactor.selectedMonth(), 7);
  assert.equal(interactor.selectedDay(), 10);
});

test('DD.MM.YYYY should be the default format for the input', function(assert) {
  var $input = this.render();
  this.subject().set('value', new Date(2010, 7, 10));

  assert.equal($input.val(), '10.08.2010');
});

test('format of the input is changeable', function(assert) {
  this.subject().set('format', 'YYYY.DD.MM');
  var $input = this.render();
  this.subject().set('value', new Date(2010, 7, 10));

  assert.equal($input.val(), '2010.10.08');
});

test('default i18n configuration of Pikaday can be changed', function(assert) {
  var component = this.subject({
    i18n: {
      previousMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    }
  });

  var $input = this.render();

  component.set('value', new Date(2014, 2, 10));
  openDatepicker($input);

  assert.equal($('.pika-select-month option:selected').text(), 'März');
});
