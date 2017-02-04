[View 1.X CHANGELOG](https://github.com/edgycircle/ember-pikaday/blob/stable-1/CHANGELOG.md)

## 2.2.1
- Enforce current date to be between specified min & max date, also on changes of those (Contribution by [@showy](https://github.com/showy))
- Replace deprecated `Ember.K` syntax with JavaScript alternative (Contribution by [@locks](https://github.com/locks))

## 2.2.0
- Fix test helper. (Contribution by [@duizendnegen](https://github.com/duizendnegen))
- Use Pikaday through npm instead of bower. (Contribution by [@josemarluedke](https://github.com/josemarluedke))
- Fix setting date to wait after min / max date to be updated. (Contribution by [@sl249](https://github.com/sl249))
- Fix firing min/max date changes. (Contribution by [@patrickberkeley](https://github.com/patrickberkeley))
- Basic Fastboot compatibility, by merely rendering an input and excluding Pikaday.js in Fastboot mode. (Contribution by [@josemarluedke](https://github.com/josemarluedke))
- Support for modern `ember-i18n`. (Contribution by [@lcpriest](https://github.com/lcpriest))

## 2.1.0
- Remove Moment.js deprecation warning due to passed non-parsable arguments. (Contribution by [@mdentremont](https://github.com/mdentremont))
- Allow binding of `tabindex` attribute. (Contribution by [@FUT](https://github.com/FUT))
- Add inputless component. (Contribution by [@lan0](https://github.com/lan0))

## 2.0.0
- Add support for `onOpen`, `onClose` and `onDraw` actions. (Contribution by [@leizhao4](https://github.com/leizhao4))

## 2.0.0-beta.2
- Passed in values respect `useUTC` setting. (Contribution by [@DanLatimer](https://github.com/DanLatimer))
- Correctly call `onSelection` action when datepicker is cleared. (Contribution by [@DanLatimer](https://github.com/DanLatimer))
- Allow binding of `hidden` and `title` attributes. (Contribution by [@ykaragol](https://github.com/ykaragol))

## 2.0.0-beta.1
- Use the DDAU paradigm prefered by Ember. (Contribution by [@Fed03](https://github.com/Fed03))
- Support all Pikaday options via an hash. (Contribution by [@Fed03](https://github.com/Fed03))
