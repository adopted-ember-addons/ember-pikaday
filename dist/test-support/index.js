import { triggerEvent, getRootElement, click } from '@ember/test-helpers';

const MONTH_SELECTOR = '.pika-lendar .pika-select-month';
const YEAR_SELECTOR = '.pika-lendar .pika-select-year';
/**
 * @param {Date} date
 */

async function selectDate(date) {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const selectEvent = 'ontouchend' in document ? 'touchend' : 'mousedown';
  const yearElement = findVisibleElement(YEAR_SELECTOR);
  yearElement.value = year;
  await triggerEvent(yearElement, 'change');
  const monthElement = findVisibleElement(MONTH_SELECTOR);
  monthElement.value = month;
  await triggerEvent(monthElement, 'change');
  await triggerEvent(findVisibleElement('td[data-day="' + day + '"]:not(.is-outside-current-month) button'), selectEvent);
}

const findVisibleElement = function (selector) {
  const elements = document.querySelectorAll(selector);
  return Array.from(elements).find(function (e) {
    return e.offsetParent != null;
  });
};

function selectedDay() {
  return document.querySelector('.pika-single td.is-selected button').innerHTML;
}
function selectedMonth() {
  return document.querySelector(MONTH_SELECTOR).value;
}
function selectedYear() {
  return document.querySelector(YEAR_SELECTOR).value;
}
function minimumYear() {
  return document.querySelector(YEAR_SELECTOR).options[0].value;
}
function maximumYear() {
  const options = document.querySelector(YEAR_SELECTOR).options;
  return options[options.length - 1].value;
}

var interactor = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectDate: selectDate,
  selectedDay: selectedDay,
  selectedMonth: selectedMonth,
  selectedYear: selectedYear,
  minimumYear: minimumYear,
  maximumYear: maximumYear
});

async function closePikaday() {
  const root = await getRootElement();
  await click(root);
}

export { interactor as Interactor, closePikaday as close };
