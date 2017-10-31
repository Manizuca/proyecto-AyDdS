module.exports = (sequelize, DataTypes) => {
    var Vote = sequelize.define("Vote", {
    }, {
        classMethods: {
            associate: function(models) {
                Vote.belongsTo(models.User);
                Vote.belongsTo(models.Decision);
                Vote.belongsTo(models.Scenario);
            }
        }
    });
    return Vote;
};
