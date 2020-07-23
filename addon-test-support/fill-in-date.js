import * as Interactor from './interactor';
import { click } from '@ember/test-helpers';
import close from './close-pikaday';

export default async function fillInDate(selector, date) {
  await click(selector);
  await Interactor.selectDate(date);
  await close();
}
