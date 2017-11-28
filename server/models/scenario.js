module.exports = (sequelize, DataTypes) => {
    var Scenario = sequelize.define("Scenario", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Scenario.belongsTo(models.Session);
                Scenario.hasMany(models.Vote, {
                    foreignKey: 'SceneId',
                    onDelete: 'cascade'
                });
            }
        }
    });
    return Scenario;
};
