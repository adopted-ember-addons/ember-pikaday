import Ember from 'ember';

var $ = Ember.$;

var openDatepicker = function(element) {
  $(element).click();

  return PikadayInteractor;
};

var PikadayInteractor = {
  selectorForMonthSelect: '.pika-select-month:visible',
  selectorForYearSelect: '.pika-select-year:visible',
  selectDate: function(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var selectEvent = 'ontouchend' in document ? 'touchend' : 'mousedown';

    $(this.selectorForYearSelect).val(year);
    triggerNativeEvent($(this.selectorForYearSelect)[0], 'change');
    $(this.selectorForMonthSelect).val(month);
    triggerNativeEvent($(this.selectorForMonthSelect)[0], 'change');

    triggerNativeEvent($('td[data-day="' + day + '"] button:visible')[0], selectEvent);
  },
  selectedDay: function() {
    return $('.pika-single td.is-selected button').html();
  },
  selectedMonth: function() {
    return $(this.selectorForMonthSelect + ' option:selected').val();
  },
  selectedYear: function() {
    return $(this.selectorForYearSelect + ' option:selected').val();
  },
  minimumYear: function() {
    return $(this.selectorForYearSelect).children().first().val();
  },
  maximumYear: function() {
    return $(this.selectorForYearSelect).children().last().val();
  }
};

function triggerNativeEvent(element, eventName) {
  if (document.createEvent) {
    var event = document.createEvent('Events');
    event.initEvent(eventName, true, false);
    element.dispatchEvent(event);
  } else {
    element.fireEvent('on' + eventName);
  }
}

export { openDatepicker };
