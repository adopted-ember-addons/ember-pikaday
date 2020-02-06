import Ember from 'ember';
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
  const pickerElement = document.querySelector(element);
  if (pickerElement) {
    pickerElement.click();
    return PikadayInteractor;
  }
  Ember.Logger.error(`${element} does not match any valid DOM element`);
};

const MONTH_SELECTOR = '.pika-lendar .pika-select-month';
const YEAR_SELECTOR = '.pika-lendar .pika-select-year';

const PikadayInteractor = {
  selectDate(date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const selectEvent = 'ontouchend' in document ? 'touchend' : 'mousedown';

    const yearSelectorElements = document.querySelectorAll(YEAR_SELECTOR);
    updateElementValues(yearSelectorElements, year);
    triggerNativeEvent(yearSelectorElements[0], 'change');

    const monthSelectorElements = document.querySelectorAll(MONTH_SELECTOR);
    updateElementValues(monthSelectorElements, month);
    triggerNativeEvent(monthSelectorElements[0], 'change');

    triggerNativeEvent(
      document.querySelector(
        `td[data-day="'${day}'"]:not(.is-outside-current-month) button}`
      ),
      selectEvent
    );
  },

  selectedDay() {
    return document.querySelector('.pika-single td.is-selected button')
      .innerHTML;
  },
  selectedMonth() {
    return document.querySelector(MONTH_SELECTOR).value;
  },
  selectedYear() {
    return document.querySelector(YEAR_SELECTOR).value;
  },
  minimumYear() {
    return document.querySelector(YEAR_SELECTOR).firstChild.value;
  },
  maximumYear() {
    document.querySelector(YEAR_SELECTOR).lastChild.value;
  }
};

function updateElementValues(elements, value) {
  elements.forEach(function(e) {
    e.value = value;
  });
}

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
