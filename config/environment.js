'use strict';

module.exports = function(environment /* appConfig */) {
  let ENV = {
    APP: {}
  };

  if (environment === 'test') {
    ENV.APP.autoboot = false;
  }

  return ENV;
};
