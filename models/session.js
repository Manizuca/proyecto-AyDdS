module.exports = (sequelize, DataTypes) => {
    var Session = sequelize.define("Session", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
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
                Session.belongsToMany(models.User, {through: 'User_Session'});
                Session.hasMany(models.Scenario);
            }
        }
    });
    return Session;
};
