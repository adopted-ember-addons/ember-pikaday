## 0.13.0
* Add binding for `name` attribute. (Contribution of @listepo)
* Add binding for `size` attribute. (Contribution of @peteonrails)
* Set `value` to `null` when the input is cleared manually.
* Use `ember-cli-moment-shim` addon to play nicely with other moment.js based addons. (Contribution of @rinti)

## 0.12.0
* Fix npm publish fail.

## 0.11.0
* Add support for `minDate` and `maxDate`. (Contribution of @yanglang)
* Fix test helpers in scenarios with multiple date pickers on page. (Contribution of @LevelbossMike)

## 0.10.0
* Add ability to specify `firstDay`. (Contribution of @beerlington)
* Add support for the `type` attribute. (Contribution of @ChiliConSql)

## 0.9.0
* Fix error where an initially disabled datepicker tries to hide itself even though it is not rendered yet. (Contribution of @jeffreybiles)
* Improve ability to extend the component by assigning placeholder methods to the Pikaday events. (Contribution of @marcoow)

## 0.8.0
* Add support for the `disabled` attribute. (Contribution of @leojpod)
* Add support for the `placeholder` attribute. (Contribution of @leojpod)
* Add Pikaday theme support through the `theme` attribute. (Contribution of @DerToti)
* Make test helper `selectDate` work in environments supporting touch events like PhantomJS. This issue surfaced due to an update of Pikaday. (Contribution of @marcoow)
* Bumped Pikaday dependency to `~> 1.3.3`.

## 0.7.2
* Do not call the `value` observer before `pikaday` is set. (Assistance by @DenizOkcu and @polymathnyc)

## 0.7.1
* Fix `interactor.selectDate` in IE10.

## 0.7.0
* Ignore `tmp/` directory for npm package. (Contribution of @odoe)
* Set value to `null` when no date is selected due clearing the input.

## 0.6.0
* Add ability to force the datepicker to return UTC dates. (Contribution of @jniechcial)

## 0.5.0
* Add ability to specify `yearRange`. (Contribution of @brettchalupa)

## 0.4.0
* Add attribute binding for `readonly`. (Contribution of @DenizOkcu)

## 0.3.0
* Make test helpers available to application developers.

## 0.2.1
* Use `app.bowerDirectory` instead of hardcoded path.

## 0.2.0
* Change Bower dependency correctly to `moment` instead of `momentjs`.
* Wrap Pikaday select callback in Ember run loop according to official recommendations. (Contribution of @regularjack)

## 0.1.0
* Support localizing the datepicker.
