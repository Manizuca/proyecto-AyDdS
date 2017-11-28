module.exports = (sequelize, DataTypes) => {
    var Vote = sequelize.define("Vote", {
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        UserEmail: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        SceneId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        DecisionId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        guestSID: {
            type: DataTypes.STRING,
            defaultValue: '',
            primaryKey: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                Vote.belongsTo(models.User, {
                    foreignKey: 'UserEmail',
                });
                Vote.belongsTo(models.Decision, {
                    foreignKey: 'DecisionId',
                });
                Vote.belongsTo(models.Scenario, {
                    foreignKey: 'SceneId',
                    onDelete: 'cascade'
                });
            }
        }
    });
    return Vote;
};
