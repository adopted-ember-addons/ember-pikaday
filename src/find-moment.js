import {
  dependencySatisfies,
  macroCondition,
  importSync,
} from '@embroider/macros';

export function maybeFindMoment() {
  if (macroCondition(dependencySatisfies('moment-timezone', '*'))) {
    return importSync('moment-timezone').default;
  } else if (macroCondition(dependencySatisfies('moment', '*'))) {
    return importSync('moment').default;
  } else {
    return undefined;
  }
}

export function findMoment() {
  let moment = maybeFindMoment();
  if (moment) {
    return moment;
  }
  throw new Error(
    `You're trying to use a feature of ember-pikaday that depends on moment or moment-timezone, but neither was found`
  );
}
