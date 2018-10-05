module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    return this.addAddonToProject('ember-cli-moment-shim', '^3.0.1');
  }
};
