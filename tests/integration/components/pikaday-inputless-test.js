import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { Interactor } from 'ember-pikaday/test-support';
import hbs from 'htmlbars-inline-precompile';
import td from 'testdouble';

module('Integration | Component | pikaday-inputless', function(hooks) {
  setupRenderingTest(hooks);

  test('it has no input tag visible', async function(assert) {
    await render(hbs`
      {{pikaday-inputless}}
    `);

    assert.dom('input[type=hidden]').exists();
  });

  test('selecting a date should send an action', async function(assert) {
    const expectedDate = new Date(2013, 3, 28);
    const onSelection = td.function();
    this.set('onSelection', onSelection);

    await render(hbs`
      {{pikaday-inputless onSelection=(action onSelection)}}
    `);

    await click('input');
    await Interactor.selectDate(expectedDate);

    assert.verify(onSelection(expectedDate));
  });

  test('setting the value attribute should select the correct date', async function(assert) {
    this.set('value', new Date(2010, 7, 10));

    await render(hbs`
      {{pikaday-inputless value=value}}
    `);

    await click('input');

    assert.equal(Interactor.selectedYear(), 2010);
    assert.equal(Interactor.selectedMonth(), 7);
    assert.equal(Interactor.selectedDay(), 10);
  });

  test('using disabled hides the picker', async function(assert) {
    await render(hbs`
      {{pikaday-inputless disabled=true}}
    `);

    assert
      .dom('.pika-single')
      .hasClass('is-hidden', 'should be closed before clicking');
  });
});
