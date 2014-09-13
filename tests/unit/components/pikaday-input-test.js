import { test, moduleForComponent } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import Ember from 'ember';

var App;

moduleForComponent('pikaday-input', 'PikadayInputComponent', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('is an input tag', function() {
  equal('INPUT', this.$().prop('tagName'));

  this.subject().teardownPikaday();
});

test('clicking the input opens the pikaday dialog', function() {
  this.append();

  ok($('.pika-single').hasClass('is-hidden'));
  openPopup();
  ok(!$('.pika-single').hasClass('is-hidden'));

  this.subject().teardownPikaday();
});

test('selecting a date should update the value attribute', function() {
  var component = this.subject();
  this.append();
  selectDate(new Date(2013, 3, 28));

  var date = this.subject().get('value');

  equal(date.getFullYear(), 2013);
  equal(date.getMonth(), 3);
  equal(date.getDate(), 28);

  this.subject().teardownPikaday();
});

test('setting the value attribute should select the correct date', function() {
  this.append();

  this.subject().set('value', new Date(2010, 7, 10));
  openPopup();

  ok($(selectorForYearOption(2010)).is(':selected'));
  ok($(selectorForMonthOption(7)).is(':selected'));
  ok($(selectorForDayButtonWrapper(10)).hasClass('is-selected'));

  this.subject().teardownPikaday();
});

test('DD.MM.YYYY should be the default format for the input', function() {
  this.append();
  this.subject().set('value', new Date(2010, 7, 10));

  equal(find('input').val(), '10.08.2010');

  this.subject().teardownPikaday();
});

test('format of the input is changeable', function() {
  this.subject().set('format', 'YYYY.DD.MM');
  this.append();
  this.subject().set('value', new Date(2010, 7, 10));

  equal(find('input').val(), '2010.10.08');

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

  this.append();

  component.set('value', new Date(2014, 2, 10));
  openPopup();

  equal($('.pika-select-month option:selected').text(), 'März');

  this.subject().teardownPikaday();
});

function selectDate(date) {
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  openPopup();

  $(selectorForYearOption(year)).attr('selected', 'selected');
  triggerNativeEvent($(selectorForYearSelect())[0], 'change');

  $(selectorForMonthOption(month)).attr('selected', 'selected');
  triggerNativeEvent($(selectorForMonthSelect())[0], 'change');

  triggerNativeEvent($(selectorForDayButton(day))[0], 'mousedown');
}

function openPopup() {
  click('input');
}

function selectorForMonthSelect() {
  return '.pika-select-month';
}

function selectorForMonthOption(month) {
  return selectorForMonthSelect() + ' option[value="' + month + '"]';
}

function selectorForYearSelect() {
  return '.pika-select-year';
}

function selectorForYearOption(year) {
  return selectorForYearSelect() + ' option[value="' + year + '"]';
}

function selectorForDayButton(day) {
  return selectorForDayButtonWrapper(day) + ' button';
}

function selectorForDayButtonWrapper(day) {
  return 'td[data-day="' + day + '"]';
}

function triggerNativeEvent(element, eventName) {
  if (element.fireEvent) {
    element.fireEvent('on' + eventName);
  } else {
    var event = document.createEvent('Events');
    event.initEvent(eventName, true, false);
    element.dispatchEvent(event);
  }
}
