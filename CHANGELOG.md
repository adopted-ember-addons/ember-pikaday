# Changelog

## Release (2024-02-06)

ember-pikaday 5.0.0 (major)

#### :boom: Breaking Change
* `ember-pikaday`
  * [#593](https://github.com/adopted-ember-addons/ember-pikaday/pull/593) fix: Prevent ember-pikaday from automatically updating values to within a min/max date bounds ([@Duder-onomy](https://github.com/Duder-onomy))

#### Committers: 1
- Greg Larrenaga ([@Duder-onomy](https://github.com/Duder-onomy))
## Release (2024-01-29)

ember-pikaday 4.1.0 (minor)

#### :rocket: Enhancement
* `ember-pikaday`
  * [#535](https://github.com/adopted-ember-addons/ember-pikaday/pull/535) feat: add new `register` attr to access pikaday instance, moment instance replaceable ([@betocantu93](https://github.com/betocantu93))

#### :bug: Bug Fix
* `ember-pikaday`
  * [#569](https://github.com/adopted-ember-addons/ember-pikaday/pull/569) Bug: updated tests ([@MelSumner](https://github.com/MelSumner))
  * [#540](https://github.com/adopted-ember-addons/ember-pikaday/pull/540) fix(modifier): ensure compatibility with ember-modifier v4 ([@anehx](https://github.com/anehx))

#### :memo: Documentation
* `ember-pikaday`
  * [#534](https://github.com/adopted-ember-addons/ember-pikaday/pull/534) fix(docs): simpler localization of datepicker ([@czosel](https://github.com/czosel))

#### :house: Internal
* `ember-pikaday`
  * [#580](https://github.com/adopted-ember-addons/ember-pikaday/pull/580) Resolve failing test scenarios ([@MelSumner](https://github.com/MelSumner))
  * [#578](https://github.com/adopted-ember-addons/ember-pikaday/pull/578) setup release-plan ([@mansona](https://github.com/mansona))
  * [#576](https://github.com/adopted-ember-addons/ember-pikaday/pull/576) use pnpm ([@mansona](https://github.com/mansona))

#### Committers: 5
- Alberto Cantú Gómez ([@betocantu93](https://github.com/betocantu93))
- Chris Manson ([@mansona](https://github.com/mansona))
- Christian Zosel ([@czosel](https://github.com/czosel))
- Jonas Metzener ([@anehx](https://github.com/anehx))
- Melanie Sumner ([@MelSumner](https://github.com/MelSumner))

## v4.0.0 (2022-02-02)

#### :rocket: Enhancement

- New `{{pikaday}}` modifier gives you direct access to Pikaday's API in a Ember template.
- Fully supports Ember 4.0
- Ships as a V2-formatted addon for better static analysis, build-system simplicity, and smaller node_modules

#### :boom: Breaking Change

- The minimum supported Ember version is now 3.25.
- The minimum supported Node version is now 12.
- This is now a V2-formatted addon, so apps need ember-auto-import 2.0 or Embroider in order to use it. See "Installation" section of README.
- You now need to opt _in_ to getting Pikaday's default CSS. See "Styles" section of the README.

- [#532](https://github.com/adopted-ember-addons/ember-pikaday/pull/532) Update for Ember 4 and Embroider ([@ef4](https://github.com/ef4))

#### :house: Internal

- [#322](https://github.com/adopted-ember-addons/ember-pikaday/pull/322) Update `.npmignore` file ([@Turbo87](https://github.com/Turbo87))
- [#321](https://github.com/adopted-ember-addons/ember-pikaday/pull/321) Cleanup dependencies ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2

- Edward Faulkner ([@ef4](https://github.com/ef4))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## v3.0.0 (2020-04-15)

#### :boom: Breaking Change

This major version release drops support for Node.js 6 and 8 and for all
Ember.js releases that happened before v3.12. Other than that there should be
no other breaking changes included in this release.

- [#307](https://github.com/adopted-ember-addons/ember-pikaday/pull/307) Update Ember CLI v3.14.0...v3.16.0 ([@jrjohnson](https://github.com/jrjohnson))

#### :rocket: Enhancement

- [#296](https://github.com/adopted-ember-addons/ember-pikaday/pull/296) Remove jquery ([@the-bionic](https://github.com/the-bionic))

#### :bug: Bug Fix

- [#309](https://github.com/adopted-ember-addons/ember-pikaday/pull/309) Fix build when included in an addon ([@jrjohnson](https://github.com/jrjohnson))
- [#297](https://github.com/adopted-ember-addons/ember-pikaday/pull/297) Prefer moment's localeData methods ([@drouhard](https://github.com/drouhard))

#### :memo: Documentation

- [#298](https://github.com/adopted-ember-addons/ember-pikaday/pull/298) use angle bracket syntax ([@the-bionic](https://github.com/the-bionic))

#### :house: Internal

- [#319](https://github.com/adopted-ember-addons/ember-pikaday/pull/319) Delete unnecessary `codemods.log` file ([@Turbo87](https://github.com/Turbo87))
- [#309](https://github.com/adopted-ember-addons/ember-pikaday/pull/309) Fix build when included in an addon ([@jrjohnson](https://github.com/jrjohnson))
- [#257](https://github.com/adopted-ember-addons/ember-pikaday/pull/257) Testing setup cleanup ([@Turbo87](https://github.com/Turbo87))
- [#234](https://github.com/adopted-ember-addons/ember-pikaday/pull/234) Replace `ember-cli-node-assets` with regular imports from `node_modules` ([@Turbo87](https://github.com/Turbo87))
- [#235](https://github.com/adopted-ember-addons/ember-pikaday/pull/235) Add dependabot config file ([@Turbo87](https://github.com/Turbo87))
- [#233](https://github.com/adopted-ember-addons/ember-pikaday/pull/233) Replace `ember-cli-template-lint` with just `ember-template-lint` ([@Turbo87](https://github.com/Turbo87))

#### Committers: 4

- Inem Patrick ([@the-bionic](https://github.com/the-bionic))
- Jonathan Johnson ([@jrjohnson](https://github.com/jrjohnson))
- Matt Drouhard ([@drouhard](https://github.com/drouhard))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))

## v2.4.1 (2019-09-10)

#### :bug: Bug Fix

- [#230](https://github.com/adopted-ember-addons/ember-pikaday/pull/230) Fixes testing of multiple pikaday inputs ([@john-griffin](https://github.com/john-griffin))

#### :house: Internal

- [#230](https://github.com/adopted-ember-addons/ember-pikaday/pull/230) Fixes testing of multiple pikaday inputs ([@john-griffin](https://github.com/john-griffin))
- [#228](https://github.com/adopted-ember-addons/ember-pikaday/pull/228) disable jquery integration for dummy app ([@efx](https://github.com/efx))

#### Committers: 2

- Eli Flanagan ([@efx](https://github.com/efx))
- John Griffin ([@john-griffin](https://github.com/john-griffin))

## v2.4.0 (2019-07-05)

#### :rocket: Enhancement

- [#220](https://github.com/adopted-ember-addons/ember-pikaday/pull/220) Remove jQuery from interactor and components ([@FabHof](https://github.com/FabHof))

#### :memo: Documentation

- [#218](https://github.com/adopted-ember-addons/ember-pikaday/pull/218) Add README localization example ([@Yelinz](https://github.com/Yelinz))

#### :house: Internal

- [#226](https://github.com/adopted-ember-addons/ember-pikaday/pull/226) run rwjblue's release it script ([@efx](https://github.com/efx))
- [#225](https://github.com/adopted-ember-addons/ember-pikaday/pull/225) introduce lerna-changelog ([@efx](https://github.com/efx))
- [#224](https://github.com/adopted-ember-addons/ember-pikaday/pull/224) remove bower configuration ([@efx](https://github.com/efx))
- [#223](https://github.com/adopted-ember-addons/ember-pikaday/pull/223) update to new repository URL ([@efx](https://github.com/efx))

#### Committers: 3

- Eli Flanagan ([@efx](https://github.com/efx))
- Fabian Hoffmann ([@FabHof](https://github.com/FabHof))
- Yelin Zhang ([@Yelinz](https://github.com/Yelinz))

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
