// Easily allow apps, which are not yet using strict mode templates, to consume your Glint types, by importing this file.
// Add all your components, helpers and modifiers to the template registry here, so apps don't have to do this.
// See https://typed-ember.gitbook.io/glint/environments/ember/authoring-addons

import type pikaday from './modifiers/pikaday';
import type PikadayInput from './components/pikaday-input';
import type PikadayInputless from './components/pikaday-inputless';

export default interface PikadayRegistry {
  pikaday: typeof pikaday;
  'pikaday-input': typeof PikadayInput;
  PikadayInput: typeof PikadayInput;
  'pikaday-inputless': typeof PikadayInputless;
  PikadayInputless: typeof PikadayInputless;
}
