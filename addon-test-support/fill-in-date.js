import { click } from '@ember/test-helpers';
import { selectDate } from './interactor';
import close from './close-pikaday';

export default async function fillInDate(selector, date) {
  await click(selector);
  await selectDate(date);
  await close();
}
