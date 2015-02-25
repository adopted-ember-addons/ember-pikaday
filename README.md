# ember-pikaday [![Build Status](https://travis-ci.org/edgycircle/ember-pikaday.svg)](https://travis-ci.org/edgycircle/ember-pikaday)

ember-pikaday is an addon that can be installed with Ember CLI. It gives you a datepicker input component that can be used in your Ember.js application. Pikaday and Moment.js are used in the background so they are added as Bower dependencies to your application.

**The component provided by ember-pikaday is fully acceptance tested. It also provides test helpers to interact with the datepicker in your own acceptance tests.**

## Installation

```bash
cd your-project-directory
ember install:addon ember-pikaday
```

## Usage

While the input shows a formatted date to the user the bound attribute is always a JavaScript date object. If the application sets the attribute without a user interaction the datepicker updates accordingly.

```handlebars
<label>
  Start date:
  {{pikaday-input value=startsAt}}
</label>
```

You can also change the default format from `DD.MM.YYYY` to any format string supported by Moment.js.

```handlebars
<label>
  Start date:
  {{pikaday-input value=startsAt format="MM/DD/YYYY"}}
</label>
```

You can change the `yearRange`. It defaults to 10. the `yearRange` can be a
single number or two comma separated years.

```handlebars
<label>
  Start date:
  {{pikaday-input value=startsAt yearRange="4"}}
</label>
```

```handlebars
<label>
  Start date:
  {{pikaday-input value=startsAt yearRange="2004,2008"}}
</label>
```

If the second year of the comma separated years is set to `currentYear`, it sets
the maximum selectable year to the current year.

```handlebars
<label>
  Start date:
  {{pikaday-input value=startsAt yearRange="2004,currentYear"}}
</label>
```

The `readonly` attribute is supported as binding so you can make the input readonly for mobile or other usecases.

```handlebars
<label>
  Start date:
  {{pikaday-input value=startsAt readonly="readonly"}}
</label>
```

## Return dates in UTC time zone

The date returned by ember-pikaday is in your local time zone due to the JavaScript default behaviour of `new Date()`. This can lead to problems when your application converts the date to UTC. In additive time zones (e.g. +0010) the resulting converted date could be yesterdays date. You can force the component to return a date with the UTC time zone by passing `useUTC=true` to it.

```handlebars
<label>
  Start date:
  {{pikaday-input value=startsAt useUTC=true}}
</label>
```

ember-pikaday will not automatically convert the date to UTC if your application is setting the datepicker value directly!


## Localization

Localizing the datepicker is possible in two steps. To localize the output of the datepicker, this is the formatted string visible in the input field, you simply add the correct Moment.js locale file to your applications `Brocfile.js`.

If I want to use the Austrian / German locale for example, my `Brocfile.js` will look like this. To use another locale you only have to change `de-at.js` to whatever locale you want to use.

```js
app.import('bower_components/moment/moment.js');
app.import('bower_components/moment/locale/de-at.js');
app.import('bower_components/pikaday/pikaday.js');
app.import('bower_components/pikaday/css/pikaday.css');
```

To localize the datepicker itself, this is the popup you see after clicking the input, a little more work is necessary. The prefered way to do this is writting a custom initializer to inject a localized `i18n` object into the datepicker component. Naturaly you can use your own localized strings instead of the ones provided by Moment.js.

```js
// app/initializers/setup-pikaday-i18n.js

/* globals moment */

import Ember from 'ember';

export default {
  name: 'setup-pikaday-i18n',
  initialize: function(container, application) {
    var i18n = Ember.Object.extend({
      previousMonth: 'Vorheriger Monat',
      nextMonth: 'Nächster Monat',
      months: moment.localeData()._months,
      weekdays: moment.localeData()._weekdays,
      weekdaysShort: moment.localeData()._weekdaysShort
    });

    container.register('pikaday-i18n:main', i18n, { singleton: true });
    application.inject('component:pikaday-input', 'i18n', 'pikaday-i18n:main');
  }
};
```

## Test Helpers

The test helpers provided by ember-pikaday allow you to interact with the datepicker in your acceptance tests. After importing them you are ready to rock and roll.

```js
import { openDatepicker } from 'ember-pikaday/helpers/pikaday';
```

To open the datepicker use `openDatepicker` and pass the input element as argument.

```js
openDatepicker(Ember.$('#my-datepicker'));
```

`openDatepicker` not only opens the datepicker but also returns an interactor that can be used to interact with it. For example you can select a specific date by using `selectDate`.

```js
var interactor = openDatepicker(Ember.$('#my-datepicker'));

interactor.selectDate(new Date(1989, 3, 28));
```

To check if a specific day, month or year is selected there are also relevant methods available.

```js
var interactor = openDatepicker(Ember.$('#my-datepicker'));

interactor.selectDate(new Date(1989, 3, 28));

equal(interactor.selectedYear(), 1989);
equal(interactor.selectedMonth(), 3);
equal(interactor.selectedDay(), 28);
```
