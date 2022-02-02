import { _ as _applyDecoratedDescriptor, d as _initializerDefineProperty } from '../_rollupPluginBabelHelpers-86df638c.js';
import { setComponentTemplate } from '@ember/component';
import { hbs } from 'ember-cli-htmlbars';
import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { tracked } from '@glimmer/tracking';

var TEMPLATE = hbs`<div ...attributes>
  {{#if this.container}}
    <PikadayInput
      type='hidden'
      class='ember-pikaday-input'
      @bound={{false}}
      @container={{this.container}}
      @defaultDate={{@defaultDate}}
      @onSelection={{@onSelection}}
      @options={{@options}}
      @maxDate={{@maxDate}}
      @minDate={{@minDate}}
      @onOpen={{@onOpen}}
      @theme={{@theme}}
      @readonly={{@readonly}}
      @placeholder={{@placeholder}}
      @required={{@required}}
      @disabled={{@disabled}}
      @autocomplete={{@autocomplete}}
      @value={{@value}}
      @format={{@format}}
      @useUTC={{@useUTC}}
      @yearRange={{@yearRange}}
      @i18n={{@i18n}}
      @firstDay={{@firstDay}}
      @onClose={{@onClose}}
      @onDraw={{@onDraw}}
    />
  {{/if}}
  <div {{this.setContainer}} class='ember-pikaday-container'></div>
</div>`;

var _class, _descriptor;
var pikadayInputless = setComponentTemplate(TEMPLATE, (_class = class _class extends Component {
  constructor(owner, args) {
    super(owner, args);

    _initializerDefineProperty(this, "container", _descriptor, this);

    this.setContainer = modifier(element => {
      this.container = element;
    });
  }

}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "container", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class));

export { pikadayInputless as default };
