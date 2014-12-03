import Ember from 'ember';

var $ = Ember.$;

var selectDate = function(date) {
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  $(selectorForYearOption(year)).attr('selected', 'selected');
  triggerNativeEvent($(selectorForYearSelect())[0], 'change');

  $(selectorForMonthOption(month)).attr('selected', 'selected');
  triggerNativeEvent($(selectorForMonthSelect())[0], 'change');

  triggerNativeEvent($(selectorForDayButton(day))[0], 'mousedown');
};

var openPopup = function($input) {
  $($input).click();
};

function selectorForMonthSelect() {
  return '.pika-select-month';
}

var selectorForMonthOption = function(month) {
  return selectorForMonthSelect() + ' option[value="' + month + '"]';
};

function selectorForYearSelect() {
  return '.pika-select-year';
}

var selectorForYearOption = function(year) {
  return selectorForYearSelect() + ' option[value="' + year + '"]';
};

function selectorForDayButton(day) {
  return selectorForDayButtonWrapper(day) + ' button';
}

var selectorForDayButtonWrapper = function(day) {
  return 'td[data-day="' + day + '"]';
};

function triggerNativeEvent(element, eventName) {
  if (element.fireEvent) {
    element.fireEvent('on' + eventName);
  } else {
    var event = document.createEvent('Events');
    event.initEvent(eventName, true, false);
    element.dispatchEvent(event);
  }
}

export { selectDate, openPopup, selectorForMonthOption, selectorForYearOption, selectorForDayButtonWrapper };
