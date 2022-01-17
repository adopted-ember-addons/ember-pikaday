import {
  dependencySatisfies,
  macroCondition,
  importSync,
} from '@embroider/macros';

export const momentOrMomentTimezone = (() => {
  if (macroCondition(dependencySatisfies('moment-timezone', '*'))) {
    return importSync('moment-timezone').default;
  } else if (macroCondition(dependencySatisfies('moment', '*'))) {
    return importSync('moment').default;
  } else {
    throw new Error(
      `ember-moment was unable to detect either moment-timezone or moment. Please add one of those to your app.`
    );
  }
})();
