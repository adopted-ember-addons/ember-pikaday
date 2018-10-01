import { triggerEvent } from '@ember/test-helpers';
import $ from 'jquery';

const MONTH_SELECTOR = '.pika-lendar:visible .pika-select-month';
const YEAR_SELECTOR = '.pika-lendar:visible .pika-select-year';

/**
 * @param {Date} date
 */
export async function selectDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const selectEvent = 'ontouchend' in document ? 'touchend' : 'mousedown';

  $(YEAR_SELECTOR).val(year);
  await triggerEvent($(YEAR_SELECTOR)[0], 'change');

  $(MONTH_SELECTOR).val(month);
  await triggerEvent($(MONTH_SELECTOR)[0], 'change');

  await triggerEvent(
    $(
      'td[data-day="' + day + '"]:not(.is-outside-current-month) button:visible'
    )[0],
    selectEvent
  );
}

export function selectedDay() {
  return $('.pika-single td.is-selected button').html();
}

export function selectedMonth() {
  return $(MONTH_SELECTOR + ' option:selected').val();
}

export function selectedYear() {
  return $(YEAR_SELECTOR + ' option:selected').val();
}

export function minimumYear() {
  return $(YEAR_SELECTOR)
    .children()
    .first()
    .val();
}

export function maximumYear() {
  return $(YEAR_SELECTOR)
    .children()
    .last()
    .val();
}
