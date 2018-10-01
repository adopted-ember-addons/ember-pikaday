import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';
import $ from 'jquery';

module('Integration | Component | pikaday-inputless', function(hooks) {
  setupRenderingTest(hooks);

  test('it has no input tag visible', async function(assert) {
    await render(hbs`
      {{pikaday-inputless}}
    `);

    assert.equal(this.$('input[type=hidden]').length, 1);
  });

  test('selecting a date should send an action', async function(assert) {
    const expectedDate = new Date(2013, 3, 28);
    this.set('onSelection', function(selectedDate) {
      assert.deepEqual(selectedDate, expectedDate);
    });

    await render(hbs`
      {{pikaday-inputless onSelection=(action onSelection)}}
    `);

    let interactor = openDatepicker(this.$('input'));
    interactor.selectDate(expectedDate);
  });

  test('setting the value attribute should select the correct date', async function(assert) {
    this.set('value', new Date(2010, 7, 10));

    await render(hbs`
      {{pikaday-inputless value=value}}
    `);

    var interactor = openDatepicker(this.$('input'));

    assert.equal(interactor.selectedYear(), 2010);
    assert.equal(interactor.selectedMonth(), 7);
    assert.equal(interactor.selectedDay(), 10);
  });

  test('using disabled hides the picker', async function(assert) {
    await render(hbs`
      {{pikaday-inputless disabled=true}}
    `);

    assert.ok(
      $('.pika-single').hasClass('is-hidden'),
      'should be closed before clicking'
    );
  });
});
