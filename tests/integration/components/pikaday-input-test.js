import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import findAll from 'ember-pikaday/test-support/-private/find-all';
import hbs from 'htmlbars-inline-precompile';
import { close as closePikaday, Interactor } from 'ember-pikaday/test-support';
import { run, bind, later } from '@ember/runloop';

const getFirstWeekendDayNumber = function() {
  let date = new Date();
  return [1, 2, 3, 4, 5, 6, 7].filter(number => {
    date.setDate(number);
    return date.getDay() === 0 || date.getDay() === 6;
  })[0];
};

const getDisabledDayCB = weekendDay => e => {
  const attr = e.attributes.getNamedItem('data-day');

  return attr ? attr.value == weekendDay : false;
};

module('Integration | Component | pikaday-input', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    run.later = function(ctx, fn) {
      if (typeof fn === 'function') {
        bind(ctx, fn)();
      } else {
        ctx();
      }
    };
  });

  hooks.afterEach(function() {
    run.later = later;
  });

  test('it is an input tag', async function(assert) {
    await render(hbs`
      {{pikaday-input}}
    `);

    assert.dom('input').exists();
  });

  test('the input tag has the readonly attribute if it has been set on the component', async function(assert) {
    await render(hbs`
      {{pikaday-input readonly=true}}
    `);

    assert.dom('input').hasAttribute('readonly');
  });

  test('clicking the input opens the pikaday dialog', async function(assert) {
    await render(hbs`
      {{pikaday-input}}
    `);

    assert.dom('.pika-single', document.body).hasClass('is-hidden');

    await click('input');

    assert.dom('.pika-single', document.body).doesNotHaveClass('is-hidden');
  });

  test('selecting a date should send an action', async function(assert) {
    const expectedDate = new Date(2013, 3, 28);

    this.set('onSelection', function(selectedDate) {
      assert.deepEqual(selectedDate, expectedDate);
    });

    await render(hbs`
      {{pikaday-input onSelection=(action onSelection)}}
    `);

    await click('input');
    await Interactor.selectDate(expectedDate);
  });

  test('clearing the date should send an action', async function(assert) {
    this.set('value', new Date(2010, 7, 10));
    this.set('onSelection', function(selectedDate) {
      assert.equal(selectedDate, null);
    });

    await render(hbs`
      {{pikaday-input value=value onSelection=(action onSelection)}}
    `);

    await click('input');
    await fillIn('input', '');

    await closePikaday();
  });

  test('opening picker should send an action', async function(assert) {
    this.set('onOpen', function() {
      assert.ok(true);
    });

    await render(hbs`
      {{pikaday-input onOpen=(action onOpen)}}
    `);

    await click('input');
  });

  test('closing picker should send an action', async function(assert) {
    this.set('onClose', function() {
      assert.ok(true);
    });

    await render(hbs`
      {{pikaday-input onClose=(action onClose)}}
    `);

    await click('input');
    await closePikaday();
  });

  test('redrawing picker should send an action', async function(assert) {
    this.set('onDraw', function() {
      assert.ok(true);
    });

    await render(hbs`
      {{pikaday-input onDraw=(action onDraw)}}
    `);

    await click('input');
  });

  test('setting the value attribute should select the correct date', async function(assert) {
    this.set('value', new Date(2010, 7, 10));

    await render(hbs`
      {{pikaday-input value=value}}
    `);

    await click('input');

    assert.equal(Interactor.selectedYear(), 2010);
    assert.equal(Interactor.selectedMonth(), 7);
    assert.equal(Interactor.selectedDay(), 10);
  });

  test('DD.MM.YYYY should be the default format for the input', async function(assert) {
    this.set('value', new Date(2010, 7, 10));

    await render(hbs`
      {{pikaday-input value=value}}
    `);

    assert.equal(this.$('input').val(), '10.08.2010');
  });

  test('format of the input is changeable', async function(assert) {
    this.set('value', new Date(2010, 7, 10));
    this.set('format', 'YYYY.DD.MM');

    await render(hbs`
      {{pikaday-input value=value format=format}}
    `);

    assert.equal(this.$('input').val(), '2010.10.08');
  });

  test('set min date', async function(assert) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.set('tomorrow', tomorrow);

    await render(hbs`
      {{pikaday-input minDate=tomorrow}}
    `);

    await click('input');

    assert.dom('.is-today', document.body).hasClass('is-disabled');
  });

  test('reset min date', async function(assert) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.set('tomorrow', tomorrow);

    await render(hbs`
      {{pikaday-input minDate=tomorrow}}
    `);

    this.set('tomorrow', null);

    await click('input');

    assert.dom('.is-today', document.body).doesNotHaveClass('is-disabled');
  });

  test('set max date', async function(assert) {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.set('yesterday', yesterday);

    await render(hbs`
      {{pikaday-input maxDate=yesterday}}
    `);

    await click('input');

    assert.dom('.is-today', document.body).hasClass('is-disabled');
  });

  test('reset max date', async function(assert) {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    this.set('yesterday', yesterday);

    await render(hbs`
      {{pikaday-input maxDate=yesterday}}
    `);

    this.set('yesterday', null);

    await click('input');

    assert.dom('.is-today', document.body).doesNotHaveClass('is-disabled');
  });

  test('set new date value with a new min date', async function(assert) {
    var tommorow = new Date(2010, 7, 10);
    this.set('tommorow', tommorow);

    await render(hbs`
      {{pikaday-input value=tommorow minDate=tommorow}}
    `);

    run(() => {
      this.set('tommorow', new Date(2010, 7, 9));
    });

    assert.equal(this.$('input').val(), '09.08.2010');
  });

  test('set new date value with a new max date', async function(assert) {
    var tommorow = new Date(2010, 7, 10);
    this.set('tommorow', tommorow);

    await render(hbs`
      {{pikaday-input value=tommorow maxDate=tommorow}}
    `);

    run(() => {
      this.set('tommorow', new Date(2010, 7, 11));
    });

    assert.equal(this.$('input').val(), '11.08.2010');
  });

  test('theme option adds theme as CSS class to DOM element', async function(assert) {
    await render(hbs`
      {{pikaday-input theme='dark-theme'}}
    `);

    assert.dom('.pika-single', document.body).hasClass('dark-theme');
  });

  test('yearRange of the input defaults to 10', async function(assert) {
    var currentYear = new Date().getFullYear();

    await render(hbs`
      {{pikaday-input}}
    `);

    await click('input');

    assert.equal(Interactor.minimumYear(), currentYear - 10);
    assert.equal(Interactor.maximumYear(), currentYear + 10);
  });

  test('yearRange of the input can be set with a range', async function(assert) {
    var currentYear = new Date().getFullYear();

    await render(hbs`
      {{pikaday-input yearRange='4'}}
    `);

    await click('input');

    assert.equal(Interactor.minimumYear(), currentYear - 4);
    assert.equal(Interactor.maximumYear(), currentYear + 4);
  });

  test('yearRange of the input can be set with comma separated years', async function(assert) {
    await render(hbs`
      {{pikaday-input yearRange='1900,2006'}}
    `);

    await click('input');

    assert.equal(Interactor.minimumYear(), 1900);
    assert.equal(Interactor.maximumYear(), 2006);
  });

  test('yearRange of the input with comma separated years supports currentYear as max', async function(assert) {
    await render(hbs`
      {{pikaday-input yearRange='1900,currentYear'}}
    `);

    await click('input');

    var currentYear = new Date().getFullYear();

    assert.equal(Interactor.minimumYear(), 1900);
    assert.equal(Interactor.maximumYear(), currentYear);
  });

  test('default i18n configuration of Pikaday can be changed', async function(assert) {
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
        'Dezember'
      ],
      weekdays: [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag'
      ],
      weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
    };
    this.set('i18n', i18n);
    this.set('value', new Date(2014, 2, 10));

    await render(hbs`
      {{pikaday-input value=value i18n=i18n}}
    `);

    await click('input');

    const monthOptions = await findAll(
      '.pika-select-month option',
      document.body
    );
    const selectedMonthOption = monthOptions.find(e =>
      e.hasAttribute('selected')
    );

    assert.dom(selectedMonthOption).hasText('März');
  });

  test('if utc is set the date returned from pikaday should be in UTC format', async function(assert) {
    const expectedDate = new Date(Date.UTC(2013, 3, 28));
    this.set('onSelection', function(selectedDate) {
      assert.deepEqual(selectedDate, expectedDate);
    });

    await render(hbs`
        {{pikaday-input onSelection=(action onSelection) useUTC=true}}
      `);

    await click('input');

    await Interactor.selectDate(new Date(2013, 3, 28));
  });

  [
    {
      date: new Date(Date.UTC(2013, 3, 28, 0, 0, 0)),
      useUTC: true
    },
    {
      date: new Date(Date.UTC(2013, 3, 28, 23, 59, 59)),
      useUTC: true
    },
    {
      date: new Date(Date.UTC(2013, 3, 28, 12, 30, 30)),
      useUTC: true
    },
    {
      date: new Date(2013, 3, 28, 0, 0, 0),
      useUTC: false
    },
    {
      date: new Date(2013, 3, 28, 23, 59, 59),
      useUTC: false
    },
    {
      date: new Date(2013, 3, 28, 12, 30, 30),
      useUTC: false
    }
  ].forEach(testParams => {
    test('value is displayed correctly when using useUTC flag', async function(assert) {
      this.set('value', testParams.date);
      this.set('useUTC', testParams.useUTC);

      await render(hbs`
        {{pikaday-input value=value useUTC=useUTC}}
      `);

      await click('input');

      assert.equal(Interactor.selectedYear(), 2013);
      assert.equal(Interactor.selectedMonth(), 3);
      assert.equal(Interactor.selectedDay(), 28);
    });
  });

  test('the input tag has the placeholder attribute and the correct value if it has been set on the component', async function(assert) {
    await render(hbs`
      {{pikaday-input placeholder=placeholder}}
    `);

    assert.dom('input').doesNotHaveAttribute('placeholder');

    this.set('placeholder', 'I am the placeholder');

    assert.dom('input').hasAttribute('placeholder', 'I am the placeholder');
  });

  test('the input tag has the required attribute if it has been set on the component', async function(assert) {
    await render(hbs`
      {{pikaday-input required=required}}
    `);

    assert.dom('input').doesNotHaveAttribute('required');

    this.set('required', true);

    assert.dom('input').hasAttribute('required');
  });

  test('the input tag has the disabled attribute if it has been set on the component', async function(assert) {
    await render(hbs`
      {{pikaday-input disabled=disabled}}
    `);

    assert.dom('input').doesNotHaveAttribute('disabled');

    this.set('disabled', true);

    assert.dom('input').hasAttribute('disabled');
  });

  test('the input tag has the autocomplete attribute if it has been set on the component', async function(assert) {
    await render(hbs`
      {{pikaday-input autocomplete=autocomplete}}
    `);

    assert.dom('input').doesNotHaveAttribute('autocomplete');

    this.set('autocomplete', 'off');

    assert.dom('input').hasAttribute('autocomplete', 'off');
  });

  // WARNING: This test will fail if the browser is not focused
  test('using disabled prevent from opening pikaday', async function(assert) {
    await render(hbs`
      {{pikaday-input disabled=true}}
    `);

    assert
      .dom('.pika-single', document.body)
      .hasClass('is-hidden', 'should be closed before clicking');

    await click('input');

    assert
      .dom('.pika-single', document.body)
      .hasClass('is-hidden', 'should still be closed after clicking');
  });

  test('the disabled attribute of the component is well linked with the input attribute', async function(assert) {
    this.set('disabled', false);

    await render(hbs`
      {{pikaday-input disabled=disabled}}
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

    assert.dom('input').isDisabled();
    assert
      .dom('.pika-single', document.body)
      .hasClass(
        'is-hidden',
        'disabled and pika-single should be hidden automatically'
      );
  });

  test('firstDay defaults to Monday (1)', async function(assert) {
    await render(hbs`
      {{pikaday-input}}
    `);

    await click('input');

    assert
      .dom('.pika-single .pika-table tr th:first-child', document.body)
      .hasText('Mon', 'First day should be Monday');
  });

  test('firstDay option overrides the default first day value', async function(assert) {
    await render(hbs`
      {{pikaday-input firstDay=0}}
    `);

    await click('input');

    assert
      .dom('.pika-single .pika-table tr th:first-child', document.body)
      .hasText('Sun', 'First day should be Sunday');
  });

  test('if an options hash is passed, default options are overridden', async function(assert) {
    assert.expect(2);

    this.set('onOpen', function() {
      assert.ok(true);
    });

    await render(hbs`
      {{pikaday-input options=(hash onOpen=onOpen disableWeekends=true)}}
    `);
    await click('input');

    const weekendDay = getFirstWeekendDayNumber();
    const disabledWeekendCell = findAll('td', document.body).find(
      getDisabledDayCB(weekendDay)
    );

    assert.dom(disabledWeekendCell).hasClass('is-disabled');
  });

  test('it updates pikaday config if options hash is changed', async function(assert) {
    const weekendDay = getFirstWeekendDayNumber();
    let disabledWeekendCell;

    this.set('disableWeekends', true);

    await render(hbs`
      {{pikaday-input options=(hash disableWeekends=disableWeekends)}}
    `);
    await click('input');

    disabledWeekendCell = findAll('td', document.body).find(
      getDisabledDayCB(weekendDay)
    );

    assert.dom(disabledWeekendCell).hasClass('is-disabled');

    await closePikaday();

    this.set('disableWeekends', false);

    await click('input');

    disabledWeekendCell = findAll('td', document.body).find(
      getDisabledDayCB(weekendDay)
    );

    assert.dom(disabledWeekendCell).doesNotHaveClass('is-disabled');
  });

  test("if minDate is greater than value we set pikaday's current date to minDate", async function(assert) {
    assert.expect(1);

    let today = new Date();
    let tomorrow = new Date(Date.now() + 60 * 60 * 24 * 1000);

    this.set('currentDate', today);
    this.set('minDate', today);

    await render(hbs`
      {{pikaday-input minDate=minDate value=currentDate onSelection=(action (mut currentDate))}}
    `);

    this.set('minDate', tomorrow);

    assert.equal(
      this.get('currentDate').getDate(),
      tomorrow.getDate(),
      'value should change'
    );
  });

  test('it clears input value if initial value is an invalid date ', function(assert) {
    assert.expect(3)

    this.render(hbs`{{pikaday-input id="pikadayTest" clearInvalidDate=true}}`);

    openDatepicker(this.$('input'));

    this.$('input').val('difouhbadsilufb33')
    assert.equal(this.$('input').val(), 'difouhbadsilufb33');
    
    closePikaday(this);

    assert.equal(this.get('value'), null);

    assert.equal(this.$('input').val(), "");
  });

  test("if maxDate is lower than value we set pikaday's current date to maxDate", async function(assert) {
    assert.expect(1);

    let today = new Date();
    let tomorrow = new Date(Date.now() + 60 * 60 * 24 * 1000);

    this.set('currentDate', tomorrow);
    this.set('maxDate', tomorrow);

    await render(hbs`
      {{pikaday-input maxDate=maxDate value=currentDate onSelection=(action (mut currentDate))}}
    `);

    this.set('maxDate', today);

    assert.equal(
      this.get('currentDate').getDate(),
      today.getDate(),
      'value should change'
    );
  });

  test("if value is null we don't enforce minDate or maxDate", async function(assert) {
    assert.expect(1);

    let today = new Date();
    let tomorrow = new Date(Date.now() + 60 * 60 * 24 * 1000);

    this.set('currentDate', null);

    await render(hbs`
      {{pikaday-input maxDate=maxDate minDate=minDate value=currentDate onSelection=(action (mut currentDate))}}
    `);

    run(() => this.set('maxDate', tomorrow));
    run(() => this.set('minDate', today));

    assert.equal(this.get('currentDate'), null, 'value should be null');
  });

  test('the original date passed to minDate or maxDate is not modified by pikaday', async function(assert) {
    assert.expect(2);

    let today = new Date();
    let todayCopy = new Date(today);
    let tomorrow = new Date(Date.now() + 60 * 60 * 24 * 1000);
    let tomorrowCopy = new Date(tomorrow);

    await render(hbs`
      {{pikaday-input minDate=minDate maxDate=maxDate value=today}}
    `);

    run(() => this.set('minDate', today));
    run(() => this.set('maxDate', tomorrow));

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

  test('it sets the defaultDate', async function(assert) {
    assert.expect(1);

    const today = new Date();

    this.set('defaultDate', today);

    await render(hbs`
      {{pikaday-input defaultDate=defaultDate}}
    `);

    assert.equal(this.get('defaultDate'), today);
  });

  test('it sets the initial date to the the defaultDate', async function(assert) {
    assert.expect(3);

    const date = new Date(2010, 7, 10);

    this.set('defaultDate', date);

    await render(hbs`
      {{pikaday-input defaultDate=defaultDate}}
    `);

    await click('input');

    assert.equal(Interactor.selectedYear(), 2010);
    assert.equal(Interactor.selectedMonth(), 7);
    assert.equal(Interactor.selectedDay(), 10);
  });

  test('the interactor should select the correct date when previous and next months are displayed', async function(assert) {
    const expectedDate = new Date(2018, 5, 28);
    this.set('options', { showDaysInNextAndPreviousMonths: true });

    await render(hbs`
      {{pikaday-input options=options}}
    `);

    await click('input');

    await Interactor.selectDate(expectedDate);

    assert.equal(Interactor.selectedYear(), 2018);
    assert.equal(Interactor.selectedMonth(), 5);
    assert.equal(Interactor.selectedDay(), 28);
  });
});

test('it clears input value if initial value is an invalid date ', function(assert) {
  assert.expect(3)

  this.render(hbs`{{pikaday-input id="pikadayTest" clearInvalidDate=true}}`);

  openDatepicker(this.$('input'));

  this.$('input').val('difouhbadsilufb33')
  assert.equal(this.$('input').val(), 'difouhbadsilufb33');
  
  closePikaday(this);

  assert.equal(this.get('value'), null);

  assert.equal(this.$('input').val(), "");
});
