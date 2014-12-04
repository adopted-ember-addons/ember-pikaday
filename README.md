ember-pikaday is an addon that can be installed with Ember CLI. It gives you a datepicker input component that can be used in your Ember.js application. Pikaday and Moment.js are used in the background so they are added as Bower dependencies to your application.

**The component provided by ember-pikaday is fully acceptance tested.**

## Installation

```bash
cd your-project-directory
npm install --save-dev ember-pikaday
ember g ember-pikaday
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
