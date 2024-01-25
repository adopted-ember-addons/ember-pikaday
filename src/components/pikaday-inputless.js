import Component from '@glimmer/component';
import { modifier } from 'ember-modifier';
import { tracked } from '@glimmer/tracking';

export default class PikadayInputlessComponent extends Component {
  @tracked container;
  constructor(owner, args) {
    super(owner, args);
    this.setContainer = modifier(
      (element) => {
        this.container = element;
      },
      { eager: false }
    );
  }
}
