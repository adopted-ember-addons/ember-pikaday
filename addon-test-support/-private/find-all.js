/**
 * NOTE: This helper exists to augment the provided `findAll` helper in `@ember/test-helpers`,
 * which does not (currently) support providing an alternate root element to search. That
 * behavior is necessary to find elements within the Pikaday pop-up
 */

import { getRootElement } from '@ember/test-helpers';

function getElements(target, rootElement = getRootElement()) {
  if (typeof target === 'string') {
    return rootElement.querySelectorAll(target);
  } else {
    throw new Error('Must use a selector string');
  }
}

function toArray(nodelist) {
  const array = new Array(nodelist.length);
  for (let i = 0; i < nodelist.length; i++) {
    array[i] = nodelist[i];
  }

  return array;
}

export default function findAll(selector, rootElement) {
  if (!selector) {
    throw new Error('Must pass a selector to `findAll`.');
  }

  return toArray(getElements(selector, rootElement));
}
