module.exports = (sequelize, DataTypes) => {
    var Session = sequelize.define("Session", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        purpose: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Session.belongsToMany(models.User, {
                    through: {
                        model: models.UserSession,
                        unique: false
                    },
                    foreignKey: 'SessionUUID'
                });
                Session.hasMany(models.Scenario, {
                    onDelete: 'cascade'
                });
            }
        }
    });
    return Session;
};
