/*jshint node:true*/
module.exports = {
  scenarios: [
    {
      name: 'default',
      bower: {
        dependencies: { }
      }
    },
    {
      name: 'ember-1.13.1',
      bower: {
        dependencies: {
          'ember': '1.13.1'
        },
        resolutions: {
          'ember': '1.13.1'
        }
      },
      npm: {
        devDependencies: {
          'ember-hash-helper-polyfill': '0.1.1'
        }
      }
    },
    {
      name: 'ember-1.13.13',
      bower: {
        dependencies: {
          'ember': '1.13.13'
        },
        resolutions: {
          'ember': '1.13.13'
        }
      },
      npm: {
        devDependencies: {
          'ember-hash-helper-polyfill': '0.1.1'
        }
      }
    },
    {
      name: 'ember-2.8.3',
      bower: {
        dependencies: {
          'ember': '2.8.3'
        },
        resolutions: {
          'ember': '2.8.3'
        }
      }
    },
    {
      name: 'ember-2.4.3',
      bower: {
        dependencies: {
          'ember': '2.4.3'
        },
        resolutions: {
          'ember': '2.4.3'
        }
      }
    },
    {
      name: 'ember-2.3.1',
      bower: {
        dependencies: {
          'ember': '2.3.1'
        },
        resolutions: {
          'ember': '2.3.1'
        }
      }
    },
    {
      name: 'ember-2.2.2',
      bower: {
        dependencies: {
          'ember': '2.2.2'
        },
        resolutions: {
          'ember': '2.2.2'
        }
      },
      npm: {
        devDependencies: {
          'ember-hash-helper-polyfill': '0.1.1'
        }
      }
    },
    {
      name: 'ember-2.0.2',
      bower: {
        dependencies: {
          'ember': '2.0.2'
        },
        resolutions: {
          'ember': '2.0.2'
        }
      },
      npm: {
        devDependencies: {
          'ember-hash-helper-polyfill': '0.1.1'
        }
      }
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      }
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          'ember': 'components/ember#beta'
        },
        resolutions: {
          'ember': 'beta'
        }
      }
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          'ember': 'components/ember#canary'
        },
        resolutions: {
          'ember': 'canary'
        }
      }
    }
  ]
};
