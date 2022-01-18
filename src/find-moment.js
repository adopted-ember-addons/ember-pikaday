import {
  dependencySatisfies,
  macroCondition,
  importSync,
} from '@embroider/macros';

export const maybeMoment = (() => {
  if (macroCondition(dependencySatisfies('moment-timezone', '*'))) {
    return importSync('moment-timezone').default;
  } else if (macroCondition(dependencySatisfies('moment', '*'))) {
    return importSync('moment').default;
  } else {
    return undefined;
  }
})();

export const moment = (() => {
  if (maybeMoment) {
    return maybeMoment;
  }
  throw new Error(
    `You're trying to use a feature of ember-pikaday that depends on moment or moment-timezone, but neither was found`
  );
})();
