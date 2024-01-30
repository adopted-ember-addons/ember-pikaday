import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { close as closePikaday, Interactor } from 'ember-pikaday/test-support';
import sinon from 'sinon';

const getFirstWeekendDayNumber = function () {
  const date = new Date();
  return [1, 2, 3, 4, 5, 6, 7].filter((number) => {
    date.setDate(number);
    return date.getDay() === 0 || date.getDay() === 6;
  })[0];
};

const getDisabledDayCB = (weekendDay) => (e) => {
  const attr = e.attributes.getNamedItem('data-day');

  return attr ? attr.value == weekendDay : false;
};

module('Integration | Component | pikaday-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it is an input tag', async function (assert) {
    await render(hbs`
      <PikadayInput/>
    `);

    assert.dom('input').exists();
  });

  test('the input tag has the readonly attribute if it has been set on the component', async function (assert) {
    await render(hbs`
      <PikadayInput @readonly={{true}}/>
    `);

    assert.dom('input').hasAttribute('readonly');
  });

  test('clicking the input opens the pikaday dialog', async function (assert) {
    await render(hbs`
      <PikadayInput/>
    `);

    assert.dom('.pika-single', document.body).hasClass('is-hidden');

    await click('input');

    assert.dom('.pika-single', document.body).doesNotHaveClass('is-hidden');
  });

  test('selecting a date should send an action', async function (assert) {
    const expectedDate = new Date(2013, 3, 28);
    this.initialDate = new Date(2013, 3, 1);

    this.set('onSelection', function (selectedDate) {
      assert.deepEqual(selectedDate, expectedDate);
    });

    await render(hbs`
      <PikadayInput @value={{this.initialDate}} @onSelection={{this.onSelection}}/>
    `);

    await click('input');
    await Interactor.selectDate(expectedDate);
  });

  test('selecting multiple dates should send actions', async function (assert) {
    const expectedDate1 = new Date(2013, 3, 28);
    const expectedDate2 = new Date(2014, 4, 1);
    this.initialDate = new Date(2013, 3, 1);

    this.set('onSelection1', function (selectedDate) {
      assert.deepEqual(selectedDate, expectedDate1);
    });

    this.set('onSelection2', function (selectedDate) {
      assert.deepEqual(selectedDate, expectedDate2);
    });

    await render(hbs`
      <PikadayInput @value={{this.initialDate}} @onSelection={{this.onSelection1}} class="first"/>
      <PikadayInput @value={{this.initialDate}} @onSelection={{this.onSelection2}} class="second"/>
    `);

    await click('input.first');
    await Interactor.selectDate(expectedDate1);

    await click('input.second');
    await Interactor.selectDate(expectedDate2);
  });

  test('clearing the date should send an action', async function (assert) {
    this.set('value', new Date(2010, 7, 10));
    this.set('onSelection', function (selectedDate) {
      assert.equal(selectedDate, null);
    });

    await render(hbs`
      <PikadayInput @value={{this.value}} @onSelection={{this.onSelection}}/>
    `);

    await click('input');
    await fillIn('input', '');

    await closePikaday();
  });

  test('opening picker should send an action', async function (assert) {
    const onOpen = sinon.fake();
    this.set('onOpen', onOpen);

    await render(hbs`
      <PikadayInput @onOpen={{this.onOpen}}/>
    `);

    await click('input');

    assert.ok(onOpen.calledOnce);
  });

  test('closing picker should send an action', async function (assert) {
    const onClose = sinon.fake();
    this.set('onClose', onClose);

    await render(hbs`
      <PikadayInput @onClose={{this.onClose}}/>
    `);

    await click('input');
    await closePikaday();

    assert.ok(onClose.calledOnce);
  });

  test('redrawing picker should send an action', async function (assert) {
    const onDraw = sinon.fake();
    this.set('onDraw', onDraw);

    await render(hbs`
      <PikadayInput @onDraw={{this.onDraw}}/>
    `);

    await click('input');

    assert.ok(onDraw.calledOnce);
  });

  test('setting the value attribute should select the correct date', async function (assert) {
    this.set('value', new Date(2010, 7, 10));

    await render(hbs`
      <PikadayInput @value={{this.value}}/>
    `);

    await click('input');

    assert.equal(Interactor.selectedYear(), 2010);
    assert.equal(Interactor.selectedMonth(), 7);
    assert.equal(Interactor.selectedDay(), 10);
  });

  test('DD.MM.YYYY should be the default format for the input', async function (assert) {
    this.set('value', new Date(2010, 7, 10));

    await render(hbs`
      <PikadayInput @value={{this.value}}/>
    `);

    assert.dom('input').hasValue('10.08.2010');
  });

  test('format of the input is changeable', async function (assert) {
    this.set('value', new Date(2010, 7, 10));
    this.set('format', 'YYYY.DD.MM');

    await render(hbs`
      <PikadayInput @value={{this.value}} @format={{this.format}}/>
    `);

    assert.dom('input').hasValue('2010.10.08');
  });

  test('set min date', async function (assert) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.set('tomorrow', tomorrow);

    await render(hbs`
      <PikadayInput @minDate={{this.tomorrow}}/>
    `);

    await click('input');

    assert.dom('.is-today', document.body).hasClass('is-disabled');
  });

  test('reset min date', async function (assert) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.set('tomorrow', tomorrow);

    await render(hbs`
      <PikadayInput @minDate={{this.tomorrow}}/>
    `);

    this.set('tomorrow', null);

    await click('input');

    assert.dom('.is-today', document.body).doesNotHaveClass('is-disabled');
  });

  test('set max date', async function (assert) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.set('yesterday', yesterday);

    await render(hbs`
      <PikadayInput @maxDate={{this.yesterday}}/>
    `);

    await click('input');

    assert.dom('.is-today', document.body).hasClass('is-disabled');
  });

  test('reset max date', async function (assert) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.set('yesterday', yesterday);

    await render(hbs`
      <PikadayInput @maxDate={{this.yesterday}}/>
    `);

    this.set('yesterday', null);

    await click('input');

    assert.dom('.is-today', document.body).doesNotHaveClass('is-disabled');
  });

  test('set new date value with a new min date', async function (assert) {
    const tomorrow = new Date(2010, 7, 10);
    this.set('tomorrow', tomorrow);

    await render(hbs`
      <PikadayInput @value={{this.tomorrow}} @minDate={{this.tomorrow}}/>
    `);

    this.set('tomorrow', new Date(2010, 7, 9));
    await settled();

    assert
      .dom('input')
      .hasValue(
        '10.08.2010',
        'we do not manipulate the value even if it violates minDate'
      );
  });

  test('set new date value with a new max date', async function (assert) {
    const tomorrow = new Date(2010, 7, 10);
    this.set('tomorrow', tomorrow);

    await render(hbs`
      <PikadayInput @value={{this.tomorrow}} @maxDate={{this.tomorrow}}/>
    `);

    this.set('tomorrow', new Date(2010, 7, 11));
    await settled();

    assert
      .dom('input')
      .hasValue(
        '10.08.2010',
        'we do not manipulate the value, even if it violates the maxDate'
      );
  });

  test('theme option adds theme as CSS class to DOM element', async function (assert) {
    await render(hbs`
      <PikadayInput @theme={{'dark-theme'}}/>
    `);

    assert.dom('.pika-single', document.body).hasClass('dark-theme');
  });

  test('yearRange of the input defaults to 10', async function (assert) {
    const currentYear = new Date().getFullYear();

    await render(hbs`
      <PikadayInput/>
    `);

    await click('input');

    assert.equal(Interactor.minimumYear(), currentYear - 10);
    assert.equal(Interactor.maximumYear(), currentYear + 10);
  });

  test('yearRange of the input can be set with a range', async function (assert) {
    const currentYear = new Date().getFullYear();

    await render(hbs`
      <PikadayInput @yearRange={{'4'}}/>
    `);

    await click('input');

    assert.equal(Interactor.minimumYear(), currentYear - 4);
    assert.equal(Interactor.maximumYear(), currentYear + 4);
  });

  test('yearRange of the input can be set with comma separated years', async function (assert) {
    await render(hbs`
      <PikadayInput @yearRange={{'1900,2006'}}/>
    `);

    await click('input');

    assert.equal(Interactor.minimumYear(), 1900);
    assert.equal(Interactor.maximumYear(), 2006);
  });

  test('yearRange of the input with comma separated years supports currentYear as max', async function (assert) {
    await render(hbs`
      <PikadayInput @yearRange={{'1900,currentYear'}}/>
    `);

    await click('input');

    const currentYear = new Date().getFullYear();

    assert.equal(Interactor.minimumYear(), 1900);
    assert.equal(Interactor.maximumYear(), currentYear);
  });

  test('default i18n configuration of Pikaday can be changed', async function (assert) {
    const i18n = {
      previousMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      months: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
      ],
      weekdays: [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
      ],
      weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    };
    this.set('i18n', i18n);
    this.set('value', new Date(2014, 2, 10));

    await render(hbs`
      <PikadayInput @value={{this.value}} @i18n={{this.i18n}}/>
    `);

    await click('input');

    const monthOptions = await findAll(
      '.pika-select-month option',
      document.body
    );
    const selectedMonthOption = monthOptions.find((e) =>
      e.hasAttribute('selected')
    );

    assert.dom(selectedMonthOption).hasText('März');
  });

  test('if utc is set the date returned from pikaday should be in UTC format', async function (assert) {
    const expectedDate = new Date(Date.UTC(2013, 3, 28));
    this.initialDate = new Date(2013, 3, 1);

    this.set('onSelection', function (selectedDate) {
      assert.deepEqual(selectedDate, expectedDate);
    });

    await render(hbs`
        <PikadayInput @value={{this.initialDate}} @onSelection={{this.onSelection}} @useUTC={{true}}/>
      `);

    await click('input');

    await Interactor.selectDate(new Date(2013, 3, 28));
  });

  [
    {
      date: new Date(Date.UTC(2013, 3, 28, 0, 0, 0)),
      useUTC: true,
    },
    {
      date: new Date(Date.UTC(2013, 3, 28, 23, 59, 59)),
      useUTC: true,
    },
    {
      date: new Date(Date.UTC(2013, 3, 28, 12, 30, 30)),
      useUTC: true,
    },
    {
      date: new Date(2013, 3, 28, 0, 0, 0),
      useUTC: false,
    },
    {
      date: new Date(2013, 3, 28, 23, 59, 59),
      useUTC: false,
    },
    {
      date: new Date(2013, 3, 28, 12, 30, 30),
      useUTC: false,
    },
  ].forEach((testParams) => {
    test('value is displayed correctly when using useUTC flag', async function (assert) {
      this.set('value', testParams.date);
      this.set('useUTC', testParams.useUTC);

      await render(hbs`
        <PikadayInput @value={{this.value}} @useUTC={{this.useUTC}}/>
      `);

      await click('input');

      assert.equal(Interactor.selectedYear(), 2013);
      assert.equal(Interactor.selectedMonth(), 3);
      assert.equal(Interactor.selectedDay(), 28);
    });
  });

  test('the input tag has the placeholder attribute and the correct value if it has been set on the component', async function (assert) {
    await render(hbs`
      <PikadayInput @placeholder={{this.placeholder}}/>
    `);

    assert.dom('input').doesNotHaveAttribute('placeholder');

    this.set('placeholder', 'I am the placeholder');
    await settled();

    assert.dom('input').hasAttribute('placeholder', 'I am the placeholder');
  });

  test('the input tag has the required attribute if it has been set on the component', async function (assert) {
    await render(hbs`
      <PikadayInput @required={{this.required}}/>
    `);

    assert.dom('input').doesNotHaveAttribute('required');

    this.set('required', true);
    await settled();

    assert.dom('input').hasAttribute('required');
  });

  test('the input tag has the disabled attribute if it has been set on the component', async function (assert) {
    await render(hbs`
      <PikadayInput @disabled={{this.disabled}}/>
    `);

    assert.dom('input').doesNotHaveAttribute('disabled');

    this.set('disabled', true);
    await settled();

    assert.dom('input').hasAttribute('disabled');
  });

  test('the input tag has the autocomplete attribute if it has been set on the component', async function (assert) {
    await render(hbs`
      <PikadayInput @autocomplete={{this.autocomplete}}/>
    `);

    assert.dom('input').doesNotHaveAttribute('autocomplete');

    this.set('autocomplete', 'off');
    await settled();

    assert.dom('input').hasAttribute('autocomplete', 'off');
  });

  test('the disabled attribute of the component is well linked with the input attribute', async function (assert) {
    this.set('disabled', false);

    await render(hbs`
      <PikadayInput @disabled={{this.disabled}}/>
    `);

    assert.dom('input').isNotDisabled();
    assert
      .dom('.pika-single', document.body)
      .hasClass('is-hidden', 'not disabled and pika-single is hidden');

    await click('input');

    assert
      .dom('.pika-single', document.body)
      .doesNotHaveClass('is-hidden', 'not disabled and pika-single is shown');

    this.set('disabled', true);
    await settled();

    assert.dom('input').isDisabled();
    assert
      .dom('.pika-single', document.body)
      .hasClass(
        'is-hidden',
        'disabled and pika-single should be hidden automatically'
      );
  });

  test('firstDay defaults to Monday (1)', async function (assert) {
    await render(hbs`
      <PikadayInput/>
    `);

    await click('input');

    assert
      .dom('.pika-single .pika-table tr th:first-child', document.body)
      .hasText('Mon', 'First day should be Monday');
  });

  test('firstDay option overrides the default first day value', async function (assert) {
    await render(hbs`
      <PikadayInput @firstDay={{0}}/>
    `);

    await click('input');

    assert
      .dom('.pika-single .pika-table tr th:first-child', document.body)
      .hasText('Sun', 'First day should be Sunday');
  });

  test('if an options hash is passed, default options are overridden', async function (assert) {
    const onOpen = sinon.fake();
    this.set('onOpen', onOpen);

    await render(hbs`
      <PikadayInput @options={{hash onOpen=this.onOpen disableWeekends=true}}/>
    `);
    await click('input');

    assert.ok(onOpen.calledOnce);

    const weekendDay = getFirstWeekendDayNumber();
    const disabledWeekendCell = findAll('td', document.body).find(
      getDisabledDayCB(weekendDay)
    );

    assert.dom(disabledWeekendCell).hasClass('is-disabled');
  });

  test('it updates pikaday config if options hash is changed', async function (assert) {
    const weekendDay = getFirstWeekendDayNumber();
    let disabledWeekendCell;

    this.set('disableWeekends', true);

    await render(hbs`
      <PikadayInput @options={{hash disableWeekends=this.disableWeekends}}/>
    `);
    await click('input');

    disabledWeekendCell = findAll('td', document.body).find(
      getDisabledDayCB(weekendDay)
    );

    assert.dom(disabledWeekendCell).hasClass('is-disabled');

    await closePikaday();

    this.set('disableWeekends', false);
    await settled();

    await click('input');

    disabledWeekendCell = findAll('td', document.body).find(
      getDisabledDayCB(weekendDay)
    );

    assert.dom(disabledWeekendCell).doesNotHaveClass('is-disabled');
  });

  test("if value is null we don't enforce minDate or maxDate", async function (assert) {
    assert.expect(1);

    const today = new Date();
    const tomorrow = new Date(Date.now() + 60 * 60 * 24 * 1000);

    this.set('currentDate', null);

    await render(hbs`
      <PikadayInput @maxDate={{this.maxDate}} @minDate={{this.minDate}} @value={{this.currentDate}} @onSelection={{fn (mut this.currentDate)}}/>
    `);

    this.set('maxDate', tomorrow);
    this.set('minDate', today);

    assert.equal(this.currentDate, null, 'value should be null');
  });

  test('the original date passed to minDate or maxDate is not modified by pikaday', async function (assert) {
    assert.expect(2);

    const today = new Date();
    const todayCopy = new Date(today);
    const tomorrow = new Date(Date.now() + 60 * 60 * 24 * 1000);
    const tomorrowCopy = new Date(tomorrow);

    await render(hbs`
      <PikadayInput @minDate={{this.minDate}} @maxDate={{this.maxDate}} @value={{this.today}}/>
    `);

    this.set('minDate', today);
    this.set('maxDate', tomorrow);
    await settled();

    assert.equal(
      today.toISOString(),
      todayCopy.toISOString(),
      'value should not change'
    );
    assert.equal(
      tomorrow.toISOString(),
      tomorrowCopy.toISOString(),
      'value should not change'
    );
  });

  test('it sets the defaultDate', async function (assert) {
    assert.expect(1);

    const today = new Date();

    this.set('defaultDate', today);

    await render(hbs`
      <PikadayInput @defaultDate={{this.defaultDate}}/>
    `);

    assert.equal(this.defaultDate, today);
  });

  test('it sets the initial date to the the defaultDate', async function (assert) {
    assert.expect(3);

    const date = new Date(2010, 7, 10);

    this.set('defaultDate', date);

    await render(hbs`
      <PikadayInput @defaultDate={{this.defaultDate}}/>
    `);

    await click('input');

    assert.equal(Interactor.selectedYear(), 2010);
    assert.equal(Interactor.selectedMonth(), 7);
    assert.equal(Interactor.selectedDay(), 10);
  });

  test('the interactor should select the correct date when previous and next months are displayed', async function (assert) {
    const expectedDate = new Date(2018, 5, 28);
    this.set('options', { showDaysInNextAndPreviousMonths: true });

    await render(hbs`
      <PikadayInput @options={{this.options}}/>
    `);

    await click('input');

    await Interactor.selectDate(expectedDate);

    assert.equal(Interactor.selectedYear(), 2018);
    assert.equal(Interactor.selectedMonth(), 5);
    assert.equal(Interactor.selectedDay(), 28);
  });

  test('register should give access to pikaday instance for granular control', async function (assert) {
    this.set('registerFn', (pikaday) => {
      assert.ok(pikaday, 'pikaday registration failed');
    });

    await render(hbs`
      <PikadayInput @register={{this.registerFn}}/>
    `);
  });

  test('passing moment fn', async function (assert) {
    assert.expect(3);
    class _moment {
      format() {
        return this;
      }
      toDate() {
        return new Date();
      }
      utc() {
        return this;
      }
    }
    const moment = function () {
      assert.ok(true, 'moment fn called');
      return new _moment();
    };

    moment.utc = () => {
      assert.ok(true, 'moment utc fn called');
      return new _moment();
    };

    this.set('updateCurrentDate', (date) => {
      this.set('currentDate', date);
    });
    this.set('moment', moment);

    await render(hbs`
      <PikadayInput @onSelection={{this.updateCurrentDate}} @value={{this.currentDate}} @moment={{this.moment}} @useUTC={{true}}/>
    `);

    await click('input');
    await Interactor.selectDate(new Date());
  });
});

/**
 * NOTE: This helper exists to augment the provided `findAll` helper in `@ember/test-helpers`,
 * which does not (currently) support providing an alternate root element to search. That
 * behavior is necessary to find elements within the Pikaday pop-up
 */

import { getRootElement } from '@ember/test-helpers';

function getElements(target, rootElement = getRootElement()) {
  if (typeof target === 'string') {
    return rootElement.querySelectorAll(target);
  } else {
    throw new Error('Must use a selector string');
  }
}

function toArray(nodelist) {
  const array = new Array(nodelist.length);
  for (let i = 0; i < nodelist.length; i++) {
    array[i] = nodelist[i];
  }

  return array;
}

function findAll(selector, rootElement) {
  if (!selector) {
    throw new Error('Must pass a selector to `findAll`.');
  }

  return toArray(getElements(selector, rootElement));
}
