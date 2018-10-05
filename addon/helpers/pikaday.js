import $ from 'jquery';
import { deprecate } from '@ember/debug';

deprecate(
  'Pikaday helpers from `ember-pikaday/helpers/pikaday` will be removed in the next major version; please use `async/await` helpers from `ember-pikaday/test-support`',
  true,
  {
    id: 'ember-pikaday.test-support-helpers',
    until: '3.0.0'
  }
);

const openDatepicker = function(element) {
  $(element).click();

  return PikadayInteractor;
};

const PikadayInteractor = {
  selectorForMonthSelect: '.pika-lendar:visible .pika-select-month',
  selectorForYearSelect: '.pika-lendar:visible .pika-select-year',
  selectDate(date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const selectEvent = 'ontouchend' in document ? 'touchend' : 'mousedown';

    $(this.selectorForYearSelect).val(year);
    triggerNativeEvent($(this.selectorForYearSelect)[0], 'change');
    $(this.selectorForMonthSelect).val(month);
    triggerNativeEvent($(this.selectorForMonthSelect)[0], 'change');

    triggerNativeEvent(
      $(
        'td[data-day="' +
          day +
          '"]:not(.is-outside-current-month) button:visible'
      )[0],
      selectEvent
    );
  },
  selectedDay() {
    return $('.pika-single td.is-selected button').html();
  },
  selectedMonth() {
    return $(this.selectorForMonthSelect + ' option:selected').val();
  },
  selectedYear() {
    return $(this.selectorForYearSelect + ' option:selected').val();
  },
  minimumYear() {
    return $(this.selectorForYearSelect)
      .children()
      .first()
      .val();
  },
  maximumYear() {
    return $(this.selectorForYearSelect)
      .children()
      .last()
      .val();
  }
};

function triggerNativeEvent(element, eventName) {
  if (document.createEvent) {
    const event = document.createEvent('Events');
    event.initEvent(eventName, true, false);
    element.dispatchEvent(event);
  } else {
    element.fireEvent('on' + eventName);
  }
}

export { openDatepicker };
