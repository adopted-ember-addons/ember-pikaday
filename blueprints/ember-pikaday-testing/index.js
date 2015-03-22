var EOL = require('os').EOL;

module.exports = {
  description: 'Adds ember-pikaday testing helpers to your application',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var startAppFilePath = 'tests/helpers/start-app.js';
    var jsHintFilePath = 'tests/.jshintrc';
    var importStatement = 'import registerEmberPikadayTestHelpers from \'ember-pikaday/helpers/testing\';';
    var importEmberStatement = 'import Ember from \'ember\';' + EOL;
    var registerTestHelpersCall = '    registerEmberPikadayTestHelpers();';
    var injectTestHelpersCall = '    application.injectTestHelpers();';
    var predefinedVariables = '    "openDatepicker",' + EOL + '    "selectDate",';
    var predefinedVariablesArrayStart = '"predef": [' + EOL;

    return this.insertIntoFile(startAppFilePath, importStatement, { after: importEmberStatement })
                .then(function() {
                  return this.insertIntoFile(startAppFilePath, registerTestHelpersCall, { before: injectTestHelpersCall });
                }.bind(this))
                .then(function() {
                  return this.insertIntoFile(jsHintFilePath, predefinedVariables, { after: predefinedVariablesArrayStart });
                }.bind(this));
  }
};
