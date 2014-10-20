module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    var that = this;

    return this.addBowerPackageToProject('pikaday').then(function() {
        return that.addBowerPackageToProject('moment');
    });
  }
};
