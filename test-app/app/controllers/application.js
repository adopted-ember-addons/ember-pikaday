/* eslint-disable no-console */
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Controller {
  @tracked startDate = new Date();
  today = new Date();

  isMinDateSet = true;
  isMaxDateSet = true;

  @action
  clearStartDate() {
    this.startDate = null;
  }

  @action
  doSomethingWithSelectedValue(value) {
    console.log(value);
  }

  @action
  setStartDate(date) {
    this.startDate = date;
  }
}
