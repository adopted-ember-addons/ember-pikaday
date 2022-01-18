'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { maybeEmbroider } = require('@embroider/test-setup');

let alias = {
  testdouble$: 'testdouble/dist/testdouble.js',
};

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-pikaday'],
      alias,
    },
  });

  return maybeEmbroider(app, {
    packagerOptions: {
      webpackConfig: {
        resolve: {
          alias,
        },
      },
    },
    skipBabel: [
      {
        package: 'qunit',
      },
      {
        package: 'moment',
      },
      {
        package: 'moment-timezone',
      },
      {
        package: 'testdouble',
      },
    ],
  });
};
