import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';

const getFirstWeekendDayNumber = function() {
  let date = new Date();
  return [1,2,3,4,5,6,7].find(number => {
    date.setDate(number);
    return date.getDay() === 0 || date.getDay() === 6;
  });
};

moduleForComponent('pikaday-input', 'Integration | Component | pikaday input', {
  integration: true
});

test('it is an input tag', function(assert) {
  this.render(hbs`{{pikaday-input}}`);
  assert.equal(this.$('input').length, 1);
});

test('the input tag has the readonly attribute if it has been set on the component', function(assert) {
  this.render(hbs`{{pikaday-input readonly=true}}`);
  assert.ok(this.$('input').is('[readonly]'));
});

test('clicking the input opens the pikaday dialog', function(assert) {
  this.render(hbs`{{pikaday-input}}`);

  assert.ok($('.pika-single').hasClass('is-hidden'));
  this.$('input').click();
  assert.notOk($('.pika-single').hasClass('is-hidden'));
});

test('selecting a date should send an action', function(assert) {
  const expectedDate = new Date(2013, 3, 28);
  this.on('onSelection', function(selectedDate) {
    assert.deepEqual(selectedDate, expectedDate);
  });
  this.render(hbs`{{pikaday-input onSelection=(action 'onSelection')}}`);

  let interactor = openDatepicker(this.$('input'));
  interactor.selectDate(expectedDate);
});

test('setting the value attribute should select the correct date', function(assert) {
  this.set('value', new Date(2010, 7, 10));
  this.render(hbs`{{pikaday-input value=value}}`);

  var interactor = openDatepicker(this.$('input'));

  assert.equal(interactor.selectedYear(), 2010);
  assert.equal(interactor.selectedMonth(), 7);
  assert.equal(interactor.selectedDay(), 10);
});

test('DD.MM.YYYY should be the default format for the input', function(assert) {
  this.set('value', new Date(2010, 7, 10));
  this.render(hbs`{{pikaday-input value=value}}`);

  assert.equal(this.$('input').val(), '10.08.2010');
});

test('format of the input is changeable', function(assert) {
  this.set('value', new Date(2010, 7, 10));
  this.set('format', 'YYYY.DD.MM');
  this.render(hbs`{{pikaday-input value=value format=format}}`);

  assert.equal(this.$('input').val(), '2010.10.08');
});

test('set min date', function(assert) {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  this.set('tomorrow', tomorrow);
  this.render(hbs`{{pikaday-input minDate=tomorrow}}`);
  this.$('input').click();

  assert.ok($('.is-today').hasClass('is-disabled'));
});

test('set max date', function(assert) {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  this.set('yesterday', yesterday);
  this.render(hbs`{{pikaday-input maxDate=yesterday}}`);
  this.$('input').click();

  assert.ok($('.is-today').hasClass('is-disabled'));
});

test('theme option adds theme as CSS class to DOM element', function(assert) {
  this.render(hbs`{{pikaday-input theme='dark-theme'}}`);

  assert.ok($('.pika-single').hasClass('dark-theme'));
});

test('yearRange of the input defaults to 10', function(assert) {
  var currentYear = new Date().getFullYear();
  this.render(hbs`{{pikaday-input}}`);
  var interactor = openDatepicker(this.$('input'));

  assert.equal(interactor.minimumYear(), currentYear - 10);
  assert.equal(interactor.maximumYear(), currentYear + 10);
});

test('yearRange of the input can be set with a range', function(assert) {
  var currentYear = new Date().getFullYear();
  this.render(hbs`{{pikaday-input yearRange='4'}}`);
  var interactor = openDatepicker(this.$('input'));

  assert.equal(interactor.minimumYear(), currentYear - 4);
  assert.equal(interactor.maximumYear(), currentYear + 4);
});

test('yearRange of the input can be set with comma separated years', function(assert) {
  this.render(hbs`{{pikaday-input yearRange='1900,2006'}}`);
  var interactor = openDatepicker(this.$('input'));

  assert.equal(interactor.minimumYear(), 1900);
  assert.equal(interactor.maximumYear(), 2006);
});

test('yearRange of the input with comma separated years supports currentYear as max', function(assert) {
  this.render(hbs`{{pikaday-input yearRange='1900,currentYear'}}`);
  var interactor = openDatepicker(this.$('input'));
  var currentYear = new Date().getFullYear();

  assert.equal(interactor.minimumYear(), 1900);
  assert.equal(interactor.maximumYear(), currentYear);
});

test('default i18n configuration of Pikaday can be changed', function(assert) {
  const i18n = {
    previousMonth: 'Vorheriger Monat',
    nextMonth: 'Nächster Monat',
    months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
  };
  this.set('i18n', i18n);
  this.set('value', new Date(2014, 2, 10));
  this.render(hbs`{{pikaday-input value=value i18n=i18n}}`);

  openDatepicker(this.$('input'));

  assert.equal($('.pika-select-month option:selected').text(), 'März');
});

test('if utc is set the date returned from pikaday should be in UTC format', function(assert) {
  const expectedDate = new Date(2013, 3, 28);
  this.on('onSelection', function(selectedDate) {
    assert.deepEqual(selectedDate, expectedDate);
  });
  this.render(hbs`{{pikaday-input onSelection=(action 'onSelection') useUtc=true}}`);

  var interactor = openDatepicker(this.$('input'));
  interactor.selectDate(expectedDate);
});

test('the input tag has the placeholder attribute and the correct value if it has been set on the component', function(assert) {
  this.render(hbs`{{pikaday-input placeholder=placeholder}}`);

  assert.equal(this.$('input').attr('placeholder'), undefined);

  this.set('placeholder', 'I am the placeholder');
  assert.equal(this.$('input').attr('placeholder'), 'I am the placeholder');
});

test('the input tag has the required attribute if it has been set on the component', function(assert) {
  this.render(hbs`{{pikaday-input required=required}}`);

  assert.notOk(this.$('input').is('[required]'));

  this.set('required', true);
  assert.ok(this.$('input').is('[required]'));
});

test('the input tag has the disabled attribute if it has been set on the component', function(assert) {
  this.render(hbs`{{pikaday-input disabled=disabled}}`);

  assert.notOk(this.$('input').is('[disabled]'));

  this.set('disabled', true);
  assert.ok(this.$('input').is('[disabled]'));
});

test('using disabled prevent from opening pikaday', function(assert) {
  this.render(hbs`{{pikaday-input disabled=true}}`);

  assert.ok($('.pika-single').hasClass('is-hidden'), 'should be closed before clicking');
  openDatepicker(this.$('input'));
  assert.ok($('.pika-single').hasClass('is-hidden', 'should still be closed after clicking'));
});

test('the disabled attribute of the component is well linked with the input attribute', function(assert) {
  this.render(hbs`{{pikaday-input disabled=disabled}}`);

  assert.notOk(this.$('input').is('[disabled]'),  'disabled should not be set');
  assert.ok($('.pika-single').hasClass('is-hidden'), 'not disabled and pika-single is hidden');
  openDatepicker(this.$('input'));
  assert.notOk($('.pika-single').hasClass('is-hidden', 'not disabled and pika-single is shown'));

  this.set('disabled', true);
  assert.ok(this.$('input').is('[disabled]'), 'disabled should now be set');
  assert.ok($('.pika-single').hasClass('is-hidden', 'disabled and pika-single should be hidden automatically'));
});

test('firstDay defaults to Monday (1)', function(assert) {
  this.render(hbs`{{pikaday-input}}`);
  openDatepicker(this.$('input'));

  var firstDay = $('.pika-single .pika-table tr th:first-child').text();

  assert.equal(firstDay, 'Mon', 'First day should be Monday');
});

test('firstDay option overrides the default first day value', function(assert) {
  this.render(hbs`{{pikaday-input firstDay=0}}`);
  openDatepicker(this.$('input'));

  var firstDay = $('.pika-single .pika-table tr th:first-child').text();

  assert.equal(firstDay, 'Sun', 'First day should be Sunday');
});

test('if an options hash is passed, default options are overridden', function(assert) {
  assert.expect(2);
  this.set('onOpen', function() {
    assert.ok(true);
  });
  this.render(hbs`{{pikaday-input options=(hash onOpen=onOpen disableWeekends=true)}}`);
  openDatepicker(this.$('input'));
  const weekendDay = getFirstWeekendDayNumber();

  assert.ok($(`td[data-day=${weekendDay}]`).hasClass('is-disabled'));
});
