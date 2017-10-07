module.exports = (sequelize, DataTypes) => {
    var Session = sequelize.define("Session", {
        uuid: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
