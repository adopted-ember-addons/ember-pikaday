# ember-pikaday

[![Build Status](https://travis-ci.com/adopted-ember-addons/ember-pikaday.svg?branch=master)](https://travis-ci.com/adopted-ember-addons/ember-pikaday)
[![Ember Observer Score](https://emberobserver.com/badges/ember-pikaday.svg)](https://emberobserver.com/addons/ember-pikaday)
[![NPM](https://badgen.net/npm/v/ember-pikaday)](https://www.npmjs.com/package/ember-pikaday)

ember-pikaday is an addon that can be installed with Ember CLI. It gives you a datepicker input component that can be used in your Ember.js application. [ember-cli-moment-shim](https://github.com/jasonmit/ember-cli-moment-shim) is used in the background so it is added as NPM dependencies to your application.

**The component provided by ember-pikaday is fully acceptance tested. It also provides test helpers to interact with the datepicker in your own acceptance tests. It works in Ember 1.13.1+ or 2.0+, including beta and canary.**

## Installation

```bash
cd your-project-directory
ember install ember-pikaday
```

_This README is for the new 2.X release of ember-pikaday. You can find the [1.X README in the stable-1 branch](https://github.com/edgycircle/ember-pikaday/blob/stable-1/README.md)._

## Usage

While the input shows a formatted date to the user, the `value` attribute can be any valid JavaScript date including `Date` object. If the application sets the attribute without a user interaction the datepicker updates accordingly.

```handlebars
<label>
  Start date:
  {{pikaday-input onSelection=(action 'doSomethingWithSelectedValue')}}
</label>
```

You can also pass in other closure actions to handle `onOpen`, `onClose` and `onDraw` events.

```handlebars
<label>
  Start date:
  {{pikaday-input onOpen=(action 'doSomethingOnOpen') onClose=(action 'doSomethingOnClose')
    onDraw=(action 'doSomethingOnDraw')}}
</label>
```

You can also change the default format from `DD.MM.YYYY` to any format string supported by Moment.js.

```handlebars
<label>
  Start date:
  {{pikaday-input format="MM/DD/YYYY"}}
</label>
```

You can define a theme which will be a CSS class that can be used as a hook for styling different themes.

```handlebars
<label>
  Start date:
  {{pikaday-input theme="dark-theme" }}
</label>
```

You can change the `yearRange`. It defaults to 10. the `yearRange` can be a
single number or two comma separated years.

```handlebars
<label>
  Start date:
  {{pikaday-input yearRange="4"}}
</label>
```

```handlebars
<label>
  Start date:
  {{pikaday-input yearRange="2004,2008"}}
</label>
```

If the second year of the comma separated years is set to `currentYear`, it sets
the maximum selectable year to the current year.

```handlebars
<label>
  Start date:
  {{pikaday-input yearRange="2004,currentYear"}}
</label>
```

The `readonly` attribute is supported as binding so you can make the input readonly for mobile or other usecases.

```handlebars
<label>
  Start date:
  {{pikaday-input readonly="readonly"}}
</label>
```

The `placeholder` attribute is supported as binding so you can improve the user experience of your interface.

```handlebars
<label>
  Due date:
  {{pikaday-input placeholder="Due date of invoice"}}
</label>
```

The `disabled` attribute is supported as binding so you can disabled the datepicker entirely.
If the datepicker is shown to the user and it gets disabled it will close the datepicker itself.

```handlebars
<label>
  Due date:
  {{pikaday-input disabled=isDisabled}}
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
  {{pikaday-input firstDay=0}}
</label>
```

The `minDate` attribute is supported as a binding so you can set the earliest date that can be selected.

```handlebars
<label>
  Due Date:
  {{pikaday-input minDate=minDate}}
</label>
```

The `maxDate` attribute is supported as a binding so you can set the latest date that can be selected.

```handlebars
<label>
  Due Date:
  {{pikaday-input maxDate=maxDate}}
</label>
```

## Return dates in UTC time zone

The date returned by ember-pikaday is in your local time zone due to the JavaScript default behaviour of `new Date()`. This can lead to problems when your application converts the date to UTC. In additive time zones (e.g. +0010) the resulting converted date could be yesterdays date. You can force the component to return a date with the UTC time zone by passing `useUTC=true` to it.

```handlebars
<label>
  Start date:
  {{pikaday-input useUTC=true}}
</label>
```

ember-pikaday will not automatically convert the date to UTC if your application is setting the datepicker value directly!

## Using pikaday specific options

You can pass any custom pikaday option through the component like this

```handlebars
<label>
  {{pikaday-input options=(hash numberOfMonths=2 disableWeekends=true disableDayFn=(action 'someAction'))}}
</label>
```

Please refer to [pikaday configuration](https://github.com/dbushell/Pikaday#configuration)

## Inputless pikaday

If you don't want to show an input field, you can use the `pikaday-inputless` component instead of `pikaday-input`. It has the same API, but doesn't support `onOpen` and `onClose`. When `disabled=true` on a `pikaday-inputless`, the datepicker gets hidden.

## Localization

Localizing the datepicker is possible in two steps. To localize the output of the datepicker, this is the formatted string visible in the input field, you simply include all the locales by following the [ember-cli-moment-shim instructions](https://github.com/jasonmit/ember-cli-moment-shim#cherry-pick-locales-optimal) and include the following in your `ember-cli-build.js`

To localize the datepicker itself, this is the popup you see after clicking the input, a little more work is necessary. The prefered way to do this is writting a custom initializer to inject a localized `i18n` object into the datepicker component. Naturally you can use your own localized strings instead of the ones provided by Moment.js.

```js
// app/initializers/setup-pikaday-i18n.js

import EmberObject from '@ember/object';
import moment from 'moment';

export default {
  name: 'setup-pikaday-i18n',
  initialize: function(application) {
    var i18n = EmberObject.extend({
      previousMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      months: moment.localeData()._months,
      weekdays: moment.localeData()._weekdays,
      weekdaysShort: moment.localeData()._weekdaysShort
    });

    application.register('pikaday-i18n:main', i18n, { singleton: true });
    application.inject('component:pikaday-input', 'i18n', 'pikaday-i18n:main');
  }
};
```

## Examples

### Show `ember-pikaday` when clicking on a button:

```handlebars
<button {{action "togglePika"}}>Show Pika</button>
{{#if showPika}}
    {{pikaday-inputless value="2017-07-07"}}
{{/if}}
```

```js
// app/controller/index.js
import Ember from 'ember';
export default Ember.Controller.extend({
  actions: {
    togglePika() {
      this.toggleProperty('showPika');
    }
  }
});
```

### Show `ember-pikaday` when hovering over a div:

```handlebars
<div {{action "showPika" on="mouseEnter"}} {{action "hidePika" on="mouseLeave"}}>
  Hover me to pika
  {{#if showPika}}
    {{pikaday-inputless value="2017-07-07"}}
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
    }
  }
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
    excludePikadayAssets: true
  }
});
```

## Other Resources

- [Video introduction by EmberScreencasts](https://www.emberscreencasts.com/posts/56-ember-pikaday)
