const { Scenarios } = require('scenario-tester');
const { module: Qmodule, test } = require('qunit');

Scenarios.fromDir(__dirname)
  .expand({
    lts_3_28,
    release,
    beta,
    canary,
    embroider,
  })
  .forEachScenario((scenario) => {
    Qmodule(scenario.name, function (hooks) {
      let app;

      hooks.before(async () => {
        app = await scenario.prepare();
      });

      test(`pnpm test`, async function (assert) {
        let result = await app.execute('pnpm run test:ember');
        assert.equal(result.exitCode, 0, result.output);
      });
    });
  });

async function lts_3_28(project) {
  project.linkDevDependency('ember-cli', {
    baseDir: __dirname,
  });
  project.linkDevDependency('ember-source', {
    baseDir: __dirname,
  });
}

async function release(project) {
  project.linkDevDependency('ember-cli', {
    baseDir: __dirname,
    resolveName: 'ember-cli-latest',
  });
  project.linkDevDependency('ember-source', {
    baseDir: __dirname,
    resolveName: 'ember-source-latest',
  });
}

async function beta(project) {
  project.linkDevDependency('ember-cli', {
    baseDir: __dirname,
    resolveName: 'ember-cli-beta',
  });
  project.linkDevDependency('ember-source', {
    baseDir: __dirname,
    resolveName: 'ember-source-beta',
  });
}

async function canary(project) {
  project.linkDevDependency('ember-source', {
    baseDir: __dirname,
    resolveName: 'ember-source-canary',
  });
}

async function embroider(project) {
  project.linkDevDependency('@embroider/core', {
    baseDir: __dirname,
  });
  project.linkDevDependency('@embroider/compat', {
    baseDir: __dirname,
  });
  project.linkDevDependency('@embroider/webpack', {
    baseDir: __dirname,
  });
}
