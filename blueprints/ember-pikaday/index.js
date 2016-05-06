module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var that = this;

    return this.addBowerPackageToProject('pikaday').then(function() {
      return that.addAddonToProject('ember-cli-moment-shim', '1.1.0');
    });
  }
};
