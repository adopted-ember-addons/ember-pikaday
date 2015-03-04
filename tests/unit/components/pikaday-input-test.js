import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

moduleForComponent('pikaday-input', 'PikadayInputComponent');

test('is an input tag', function(assert) {
  assert.equal('INPUT', this.$().prop('tagName'));
});

test('the input tag has the readonly attribute if it has been set on the component', function(assert) {
  this.subject({ 'readonly': true });

  assert.ok(this.$().is('[readonly]'));
});

test('clicking the input opens the pikaday dialog', function(assert) {
  this.render();

  assert.ok($('.pika-single').hasClass('is-hidden'));
  openDatepicker(this.$());
  assert.ok(!$('.pika-single').hasClass('is-hidden'));
});

test('selecting a date should update the value attribute', function(assert) {
  var interactor = openDatepicker(this.$());

  interactor.selectDate(new Date(2013, 3, 28));

  var date = this.subject().get('value');

  assert.equal(date.getFullYear(), 2013);
  assert.equal(date.getMonth(), 3);
  assert.equal(date.getDate(), 28);
});

test('setting the value attribute should select the correct date', function(assert) {
  this.subject({ value: new Date(2010, 7, 10) });

  var interactor = openDatepicker(this.$());

  assert.equal(interactor.selectedYear(), 2010);
  assert.equal(interactor.selectedMonth(), 7);
  assert.equal(interactor.selectedDay(), 10);
});

test('DD.MM.YYYY should be the default format for the input', function(assert) {
  this.subject({ value: new Date(2010, 7, 10) });

  assert.equal(this.$().val(), '10.08.2010');
});

test('format of the input is changeable', function(assert) {
  this.subject({ format: 'YYYY.DD.MM', value: new Date(2010, 7, 10) });

  assert.equal(this.$().val(), '2010.10.08');
});

test('assigning theme option to the component should add class to the pikaday dialog', function(assert) {
  this.subject({ theme: 'dark-theme' });
  this.render();

  assert.ok($('.pika-single').hasClass('dark-theme'));
});

test('yearRange of the input defaults to 10', function(assert) {
  var interactor = openDatepicker(this.$());
  var currentYear = new Date().getFullYear();

  assert.equal(interactor.minimumYear(), currentYear - 10);
  assert.equal(interactor.maximumYear(), currentYear + 10);
});

test('yearRange of the input can be set with a range', function(assert) {
  this.subject({ yearRange: '4' });

  var interactor = openDatepicker(this.$());
  var currentYear = new Date().getFullYear();

  assert.equal(interactor.minimumYear(), currentYear - 4);
  assert.equal(interactor.maximumYear(), currentYear + 4);
});

test('yearRange of the input can be set with comma separated years', function(assert) {
  this.subject({ yearRange: '1900,2006' });

  var interactor = openDatepicker(this.$());

  assert.equal(interactor.minimumYear(), 1900);
  assert.equal(interactor.maximumYear(), 2006);
});

test('yearRange of the input with comma separated years supports currentYear as max', function(assert) {
  this.subject({ yearRange: '1900,currentYear' });

  var interactor = openDatepicker(this.$());
  var currentYear = new Date().getFullYear();

  assert.equal(interactor.minimumYear(), 1900);
  assert.equal(interactor.maximumYear(), currentYear);
});

test('default i18n configuration of Pikaday can be changed', function(assert) {
  this.subject({
    i18n: {
      previousMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    },
    value: new Date(2014, 2, 10)
  });

  openDatepicker(this.$());

  assert.equal($('.pika-select-month option:selected').text(), 'März');
});

test('if utc is set the date returned from pikaday should be in UTC format', function(assert) {
  this.subject({ useUTC: true });

  var interactor = openDatepicker(this.$());

  interactor.selectDate(new Date(2013, 3, 28));

  var date = this.subject().get('value');

  assert.equal(date.getUTCFullYear(), 2013);
  assert.equal(date.getUTCMonth(), 3);
  assert.equal(date.getUTCDate(), 28);
});
