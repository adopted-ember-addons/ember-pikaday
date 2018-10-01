[View 1.X CHANGELOG](https://github.com/edgycircle/ember-pikaday/blob/stable-1/CHANGELOG.md)

## 2.3.0

- Cleanup scheduled task when component is torn down (Contribution by [@bdollard](https://github.com/bdollard))
- chore: configure Prettier (Contribution by [@alexlafroscia](https://github.com/alexlafroscia))
- Allow minDate & maxDate to be reset (Contribution by [@asjongers](https://github.com/asjongers))
- Update Tests (Contribution by [@alexlafroscia](https://github.com/alexlafroscia))
- fix: remove use of deprecated `sync` queue (Contribution by [@alexlafroscia](https://github.com/alexlafroscia)

## 2.2.6

- Upgrade to ES6 modules (Contribution by [@esbanarango](https://github.com/esbanarango))
- add test on interactor day selection edge case (Contribution by [@hakilebara](https://github.com/hakilebara))
- set autocomplete to off as default (Contribution by [@luxferresum](https://github.com/luxferresum))
- Move ember-cli-moment-shim to dependencies (Contribution by [@esbanarango](https://github.com/esbanarango))

## 2.2.5

- Prevent error in run later when component was destroyed (Contribution by [@Schnellesadlerauge](https://github.com/Schnellesadlerauge)))
- Upgrade to ember/ember-cli 2.18.2 (Contribution by [@mnutt](https://github.com/mnutt)))

## 2.2.4

- Fix syntax error (Contribution by [@quadstar](https://github.com/quadstar)))
- Add ability to set a default date (Contribution by [@jscn](https://github.com/jscn))
- Remove arguments in component lifecycle hooks (Contribution by [@jbaily4](https://github.com/jbailey4))
- Fixes moment deprecation by using a date format (Contribution by [@cah-danmonroe](https://github.com/cah-danmonroe))

## 2.2.3

- Allow binding of `autocomplete` attribute (Contribution by [@npafundi](https://github.com/npafundi))
- Upgrade to Ember CLI 2.12.1 (Contribution by [@leizhao4](https://github.com/leizhao4))
- Set minDate and maxDate using a copy to avoid modifying original date (Contribution by [@sandydoo](https://github.com/sandydoo))
- Fix ember-cli-node-asset deprecation of complex imports inline (Contribution by [@leizhao4](https://github.com/leizhao4))
- Remove deprecation warning in using `didUpdateAttrs` (Contribution by [@tsteuwer](https://github.com/tsteuwer))
- Make setDate asychronous (Contribution by [@bdollard](https://github.com/bdollard))
- run super on willDestroy (Contribution by [@devotox](https://github.com/devotox))
- Prepare for FastBoot 1.0 (Contribution by [@josemarluedke](https://github.com/josemarluedke))

## 2.2.2

- Fix infinite rendering invalidation detected (Contribution by [@jedrula](https://github.com/jedrula))
- Fix 2.12 deprecation of arguments in component life cycle hooks (Contribution by [@leizhao4](https://github.com/leizhao4))
- Fix enforcing minDate to allow null value (Contribution by [@ilucin](https://github.com/ilucin))

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
