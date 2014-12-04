import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

moduleForComponent('pikaday-input', 'PikadayInputComponent');

test('is an input tag', function() {
  equal('INPUT', this.$().prop('tagName'));

  this.subject().teardownPikaday();
});

test('clicking the input opens the pikaday dialog', function() {
  var $input = this.append();

  ok($('.pika-single').hasClass('is-hidden'));
  openDatepicker($input);
  ok(!$('.pika-single').hasClass('is-hidden'));

  this.subject().teardownPikaday();
});

test('selecting a date should update the value attribute', function() {
  var component = this.subject();
  var $input = this.append();
  var interactor = openDatepicker($input);

  interactor.selectDate(new Date(2013, 3, 28));

  var date = this.subject().get('value');

  equal(date.getFullYear(), 2013);
  equal(date.getMonth(), 3);
  equal(date.getDate(), 28);

  this.subject().teardownPikaday();
});

test('setting the value attribute should select the correct date', function() {
  var $input = this.append();

  this.subject().set('value', new Date(2010, 7, 10));
  var interactor = openDatepicker($input);

  equal(interactor.selectedYear(), 2010);
  equal(interactor.selectedMonth(), 7);
  equal(interactor.selectedDay(), 10);

  this.subject().teardownPikaday();
});

test('DD.MM.YYYY should be the default format for the input', function() {
  var $input = this.append();
  this.subject().set('value', new Date(2010, 7, 10));

  equal($input.val(), '10.08.2010');

  this.subject().teardownPikaday();
});

test('format of the input is changeable', function() {
  this.subject().set('format', 'YYYY.DD.MM');
  var $input = this.append();
  this.subject().set('value', new Date(2010, 7, 10));

  equal($input.val(), '2010.10.08');

  this.subject().teardownPikaday();
});

test('default i18n configuration of Pikaday can be changed', function() {
  var component = this.subject({
    i18n: {
      previousMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    }
  });

  var $input = this.append();

  component.set('value', new Date(2014, 2, 10));
  openDatepicker($input);

  equal($('.pika-select-month option:selected').text(), 'März');

  this.subject().teardownPikaday();
});
