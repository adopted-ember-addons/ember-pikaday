import { _ as _applyDecoratedDescriptor, a as _classPrivateFieldInitSpec, b as _classPrivateFieldGet, c as _classPrivateFieldSet } from '../_rollupPluginBabelHelpers-86df638c.js';
import { setComponentTemplate } from '@ember/component';
import { hbs } from 'ember-cli-htmlbars';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { f as findMoment } from '../find-moment-5f2ca6e3.js';
import '@embroider/macros';

var TEMPLATE = hbs`<input
  {{pikaday
    @options
    value=this.value
    onSelect=this.onSelect
    setDefaultDate=true
    defaultDate=@defaultDate
    onOpen=@onOpen
    onDraw=this.onDraw
    onClose=this.onClose
    format=this.format
    minDate=@minDate
    maxDate=@maxDate
    theme=@theme
    yearRange=this.yearRange
    i18n=this.i18n
    firstDay=this.firstDay
    container=@container
    bound=@bound
  }}
  {{on 'change' this.didChange}}
  type='text'
  readonly={{@readonly}}
  placeholder={{@placeholder}}
  required={{@required}}
  disabled={{@disabled}}
  autocomplete={{@autocomplete}}
  ...attributes
/>`;

var _class, _heardValue;
const moment = findMoment();
var pikadayInput = setComponentTemplate(TEMPLATE, (_class = (_heardValue = /*#__PURE__*/new WeakMap(), class _class extends Component {
  constructor(owner, args) {
    super(owner, args);

    _classPrivateFieldInitSpec(this, _heardValue, {
      writable: true,
      value: void 0
    });
  }

  get format() {
    return this.args.format || 'DD.MM.YYYY';
  }

  get value() {
    let {
      value,
      useUTC
    } = this.args;

    if (useUTC && value) {
      let format = 'YYYY-MM-DD';
      value = moment(moment.utc(value).format(format), format).toDate();
    }

    return value;
  }

  get yearRange() {
    const yearRange = this.args.yearRange;

    if (!yearRange) {
      return 10;
    }

    if (yearRange.indexOf(',') > -1) {
      const yearArray = yearRange.split(',');

      if (yearArray[1] === 'currentYear') {
        yearArray[1] = new Date().getFullYear();
      }

      return yearArray;
    } else {
      return yearRange;
    }
  }

  get i18n() {
    let i18n = this.args.i18n;

    if (!i18n) {
      return undefined;
    }

    if (!i18n.t) {
      return i18n;
    }

    return {
      previousMonth: i18n.t('previousMonth').toString(),
      nextMonth: i18n.t('nextMonth').toString(),
      months: i18n.t('months').toString().split(','),
      weekdays: i18n.t('weekdays').toString().split(','),
      weekdaysShort: i18n.t('weekdaysShort').toString().split(',')
    };
  }

  get firstDay() {
    return this.args.firstDay == null ? 1 : parseInt(this.args.firstDay, 10);
  }

  onClose() {
    if (this.isDestroying) {
      return;
    }

    if (!_classPrivateFieldGet(this, _heardValue)) {
      this.onSelect(null);
    }

    this.args.onClose?.();
  }

  onDraw() {
    // this is here because apparently the classic behavior is to pass no
    // arguments to the onDraw callback, but Pikaday's own ownDraw has an
    // argument.
    this.args.onDraw?.();
  }

  didChange(event) {
    _classPrivateFieldSet(this, _heardValue, event.target.value);
  }

  onSelect(date) {
    if (this.args.useUTC && date) {
      date = moment.utc([date.getFullYear(), date.getMonth(), date.getDate()]).toDate();
    }

    this.args.onSelection?.(date);
  }

}), (_applyDecoratedDescriptor(_class.prototype, "onClose", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onClose"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onDraw", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onDraw"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didChange", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onSelect", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onSelect"), _class.prototype)), _class));

export { pikadayInput as default };
