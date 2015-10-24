import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

moduleForComponent('pikaday-input', 'PikadayInputComponent', {});

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

test('set min date', function(assert) {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  this.subject({minDate: tomorrow});
  this.render();
  openDatepicker(this.$());

  assert.ok($('.is-today').hasClass('is-disabled'));
});

test('set max date', function(assert) {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  this.subject({maxDate: yesterday});
  this.render();
  openDatepicker(this.$());

  assert.ok($('.is-today').hasClass('is-disabled'));
});

test('theme option adds theme as CSS class to DOM element', function(assert) {
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

test('the input tag has the placeholder attribute and the correct value if it has been set on the component', function(assert) {
  this.subject({ placeholder: 'I am the placeholder'});
  this.render();

  assert.equal(this.$().attr('placeholder'), 'I am the placeholder');
});

test('the input tag does not have the placeholder attribute if it has not been set on the component', function(assert) {
  this.subject({});
  this.render();

  assert.equal(this.$().attr('placeholder'), undefined);
});

test('the input tag has the disabled attribute if it has been set on the component', function(assert) {
  this.subject({ disabled: true });
  this.render();

  assert.ok(this.$().is('[disabled]'));
});

test('the input tag does not have the disabled attribute if it has not been set on the component', function(assert) {
  this.subject({});
  this.render();

  assert.equal(this.$().attr('disabled'), undefined);
});

test('using disabled prevent from opening pikaday', function(assert) {
  this.subject({ disabled: true });
  this.render();

  assert.ok($('.pika-single').hasClass('is-hidden'), 'should be closed before clicking');
  openDatepicker(this.$());
  assert.ok($('.pika-single').hasClass('is-hidden', 'should still be closed after clicking'));
});

test('the disabled attribute of the component is well linked with the input attribute', function(assert) {
  var component = this.subject({ disabled: false });
  this.render();

  assert.equal(this.$().attr('disabled'), undefined,  'disabled should not be set');
  assert.ok($('.pika-single').hasClass('is-hidden'), 'not disabled and pika-single is hidden');
  openDatepicker(this.$());
  assert.ok(!$('.pika-single').hasClass('is-hidden', 'not disabled and pika-single is shown'));

  Ember.run(function () {
    component.set('disabled', true);
  });

  assert.ok(this.$().is('[disabled]'), 'disabled should now be set');
  assert.ok($('.pika-single').hasClass('is-hidden', 'disabled and pika-single should be hidden automatically'));
});

test('firstDay defaults to Monday (1)', function(assert) {
  this.subject();
  this.render();
  openDatepicker(this.$());

  var firstDay = $('.pika-single .pika-table tr th:first-child').text();

  assert.equal(firstDay, 'Mon', 'First day should be Monday');
});

test('firstDay option overrides the default first day value', function(assert) {
  this.subject({ firstDay: 0 });
  this.render();
  openDatepicker(this.$());

  var firstDay = $('.pika-single .pika-table tr th:first-child').text();

  assert.equal(firstDay, 'Sun', 'First day should be Sunday');
});
