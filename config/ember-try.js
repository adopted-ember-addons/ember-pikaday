module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-1.13.1',
      dependencies: {
        'ember': '1.13.1'
      }
    },
    {
      name: 'ember-1.13.13',
      dependencies: {
        'ember': '1.13.13'
      }
    },
    {
      name: 'ember-2.4.2',
      dependencies: {
        'ember': '2.4.2'
      }
    },
    {
      name: 'ember-2.3.1',
      dependencies: {
        'ember': '2.3.1'
      }
    },
    {
      name: 'ember-2.2.2',
      dependencies: {
        'ember': '2.2.2'
      }
    },
    {
      name: 'ember-2.0.2',
      dependencies: {
        'ember': '2.0.2'
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release'
      },
      resolutions: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'components/ember#beta'
      },
      resolutions: {
        'ember': 'beta'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        'ember': 'components/ember#canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    }
  ]
};
