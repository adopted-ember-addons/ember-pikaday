# ember-pikaday

[![Ember Observer Score](https://emberobserver.com/badges/ember-pikaday.svg)](https://emberobserver.com/addons/ember-pikaday)
[![NPM](https://badgen.net/npm/v/ember-pikaday)](https://www.npmjs.com/package/ember-pikaday)

ember-pikaday provides a datepicker modifier & components for Ember using the Pikaday library.

**This addon is fully integration tested, and it provides test helpers to interact with the datepicker in your own tests.**

## Installation

Prerequisites:

- Ember.js v3.25 or above
- Node.js v12 or above
- ember-auto-import 2.0 or above

Optional prerequisites:

- If you use the backward-compatible `<PikadayInput>` or `<PikadayInputless>` components, your app must depend on either `moment` or `moment-timezone` and you should remember to configure your locale and timezone requirements. See [Using Moment.js in Ember Apps & Addons](https://github.com/adopted-ember-addons/ember-moment#using-momentjs-in-ember-apps--addons).
- But if you only use the new `<input {{pikaday}} />` modifier, `moment` or `moment-timezone` are optional. Pikday itself uses them if they present, but doesn't require them.

Anti-prerequisites:

- Remove ember-cli-moment-shim from your app. Earlier versions of this addon required it, but now it will only give you a redundant copy with the one provided by ember-auto-import.

```bash
cd your-project-directory
ember install ember-pikaday
```

## Styles

In order to give apps control over styling, the default CSS does not load unless you tell it to. The simplest way to do this is to make this file:

```js
// app/modifiers/pikaday.js

/* Opt-in to using pikaday's default CSS */
import 'ember-pikaday/pikaday.css';
export { default } from 'ember-pikaday/modifiers/pikaday';
```

This means that the `{{pikaday}}` modifier within your app is the one from `ember-pikaday`, with the styles loaded too.

## Usage

### {{pikaday}} modifier

The `{{pikaday}}` modifier invokes `new Pikaday()` with your element as Pikaday's `field` option:

```hbs
<input
  {{pikaday
    format='DD.MM.YYYY'
    value=this.startDate
    onSelect=this.setStartDate
  }}
/>
```

The optional `value` argument can be used to synchronize external changes into Pikaday. Internally, we do this using Pikaday's `setDate`.

All other named arguments are passed directly to Pikaday, so see [Pikaday's configuration docs](https://github.com/Pikaday/Pikaday#configuration).

The only behaviors this modifier adds to the stock Pikaday are:

- if you set `minDate` or `maxDate` and that causes `value` to be outside the legal range, we adjust `value` and fire `onSelect` to inform you of the change
- if you set your `<input>` element's `disabled` attribute we will close Pikaday if it had been open.

### &lt;PikadayInput&gt; Component

While the input shows a formatted date to the user, the `value` attribute can be any valid JavaScript date including `Date` object. If the application sets the attribute without a user interaction the datepicker updates accordingly.

```handlebars
<label>
  Start date:
  <PikadayInput @onSelection={{action 'doSomethingWithSelectedValue'}} />
</label>
```

You can also pass in other closure actions to handle `onOpen`, `onClose` and `onDraw` events.

```handlebars
<label>
  Start date:
  <PikadayInput
    @onOpen={{action 'doSomethingOnOpen'}}
    @onClose={{action 'doSomethingOnClose'}}
    @onDraw={{action 'doSomethingOnDraw'}}
  />
</label>
```

You can also change the default format from `DD.MM.YYYY` to any format string supported by Moment.js.

```handlebars
<label>
  Start date:
  <PikadayInput @format={{'MM/DD/YYYY'}} />
</label>
```

You can define a theme which will be a CSS class that can be used as a hook for styling different themes.

```handlebars
<label>
  Start date:
  <PikadayInput @theme={{'dark-theme'}} />
</label>
```

You can change the `yearRange`. It defaults to 10. the `yearRange` can be a
single number or two comma separated years.

```handlebars
<label>
  Start date:
  <PikadayInput @yearRange={{'4'}} />
</label>
```

```handlebars
<label>
  Start date:
  <PikadayInput @yearRange={{'2004,2008'}} />
</label>
```

If the second year of the comma separated years is set to `currentYear`, it sets
the maximum selectable year to the current year.

```handlebars
<label>
  Start date:
  <PikadayInput @yearRange={{'2004,currentYear'}} />
</label>
```

The `readonly` attribute is supported as binding so you can make the input readonly for mobile or other usecases.

```handlebars
<label>
  Start date:
  <PikadayInput @readonly={{'readonly'}} />
</label>
```

The `placeholder` attribute is supported as binding so you can improve the user experience of your interface.

```handlebars
<label>
  Due date:
  <PikadayInput @placeholder={{'Due date of invoice'}} />
</label>
```

The `disabled` attribute is supported as binding so you can disabled the datepicker entirely.
If the datepicker is shown to the user and it gets disabled it will close the datepicker itself.

```handlebars
<label>
  Due date:
  <PikadayInput @disabled={{isDisabled}} />
</label>
```

The `firstDay` attribute is supported as a binding so you can set the first day of the calendar week.
Defaults to Monday.

- 0 = Sunday
- 1 = Monday
- etc...

```handlebars
<label>
  Due date:
  <PikadayInput @firstDay={{0}} />
</label>
```

The `minDate` attribute is supported as a binding so you can set the earliest date that can be selected.

```handlebars
<label>
  Due Date:
  <PikadayInput @minDate={{minDate}} />
</label>
```

The `maxDate` attribute is supported as a binding so you can set the latest date that can be selected.

```handlebars
<label>
  Due Date:
  <PikadayInput @maxDate={{maxDate}} />
</label>
```

#### Return dates in UTC time zone

The date returned by ember-pikaday is in your local time zone due to the JavaScript default behaviour of `new Date()`. This can lead to problems when your application converts the date to UTC. In additive time zones (e.g. +0010) the resulting converted date could be yesterdays date. You can force the component to return a date with the UTC time zone by passing `useUTC=true` to it.

```handlebars
<label>
  Start date:
  <PikadayInput @useUTC={{true}} />
</label>
```

ember-pikaday will not automatically convert the date to UTC if your application is setting the datepicker value directly!

#### Using pikaday specific options

You can pass any custom pikaday option through the component like this

```handlebars
<label>
  <PikadayInput
    @options={{hash
      numberOfMonths=2
      disableWeekends=true
      disableDayFn=(action 'someAction')
    }}
  />
</label>
```

Please refer to [pikaday configuration](https://github.com/dbushell/Pikaday#configuration)

### &lt;PikadayInputless&gt;

If you don't want to show an input field, you can use the `<PikadayInputless/>` component instead of `<PikadayInput/>`. It has the same API, but doesn't support `onOpen` and `onClose`. When `disabled=true` on a `pikaday-inputless`, the datepicker gets hidden.

## Localization

Localizing the datepicker is possible in two steps. To localize the output of the datepicker, this is the formatted string visible in the input field, you simply include all the locales by following the [ember-cli-moment-shim instructions](https://github.com/jasonmit/ember-cli-moment-shim#cherry-pick-locales-optimal) and include the following in your `ember-cli-build.js`

```js
app.import('node_modules/moment/locale/de.js');
```

To localize the datepicker itself, this is the popup you see after clicking the input, a little more work is necessary. The prefered way to do this is writting a custom initializer to inject a localized `i18n` object into the datepicker component. Naturally you can use your own localized strings instead of the ones provided by Moment.js.

```js
// app/initializers/setup-pikaday-i18n.js

import EmberObject from '@ember/object';
import moment from 'moment';

export default {
  name: 'setup-pikaday-i18n',
  initialize: function (application) {
    let i18n = EmberObject.extend({
      previousMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      months: moment.localeData().months(),
      weekdays: moment.localeData().weekdays(),
      weekdaysShort: moment.localeData().weekdaysShort(),
    });

    application.register('pikaday-i18n:main', i18n, { singleton: true });
    application.inject('component:pikaday-input', 'i18n', 'pikaday-i18n:main');
  },
};
```

## Examples

### Show `ember-pikaday` when clicking on a button:

```handlebars
<button {{action 'togglePika'}}>Show Pika</button>
{{#if showPika}}
  <PikadayInputless @value={{'2017-07-07'}} />
{{/if}}
```

```js
// app/controller/index.js
import Ember from 'ember';
export default Ember.Controller.extend({
  actions: {
    togglePika() {
      this.toggleProperty('showPika');
    },
  },
});
```

### Show `ember-pikaday` when hovering over a div:

```handlebars
<div
  {{action 'showPika' on='mouseEnter'}}
  {{action 'hidePika' on='mouseLeave'}}
>
  Hover me to pika
  {{#if showPika}}
    <PikadayInputless @value={{'2017-07-07'}} />
  {{/if}}
</div>
```

```js
// app/controller/index.js

import Controller from '@ember/controller';
export default Controller.extend({
  actions: {
    showPika() {
      this.set('showPika', true);
    },
    hidePika() {
      this.set('showPika', false);
    },
  },
});
```

## Test Helpers

The test helpers provided by `ember-pikaday` allow you to interact with the datepicker in your integration and acceptance tests.

### Opening Pikaday

To open the datepicker use `click` from the `@ember/test-helpers` package:

```js
import { click } from '@ember/test-helpers';

await click('.my-pikaday-input');
```

### Closing Pikaday

Pikaday can be closed with the provided `close` helper:

```js
import { close as closePikaday } from 'ember-pikaday/test-support';

await closePikaday('.my-pikaday-input');
```

### Interacting with Pikaday

An `Interactor`, like a [page object](https://martinfowler.com/bliki/PageObject.html), provides helpers for getting and setting dates in a date picker:

```js
import { click } from '@ember/test-helpers';
import { Interactor as Pikaday } from 'ember-pikaday/test-support';

await click('#my-datepicker');
await Pikaday.selectDate(new Date(1989, 3, 28));
```

There are also methods available to check if a specific day, month or year is selected:

```js
await Interactor.selectDate(new Date(1989, 3, 28));

assert.equal(Interactor.selectedYear(), 1989);
assert.equal(Interactor.selectedMonth(), 3);
assert.equal(Interactor.selectedDay(), 28);
```

## Excluding assets

By default, ember-pikaday will load for you the needed pikaday assets.
If you need to use a custom version, you can now disable auto assests importing like this:

```js
// ember-cli-build.js
let app = new EmberApp(defaults, {
  emberPikaday: {
    excludePikadayAssets: true,
  },
});
```

## Other Resources

- [Video introduction by EmberScreencasts](https://www.emberscreencasts.com/posts/56-ember-pikaday)
