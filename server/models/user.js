module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        hash: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        classMethods: {
            associate: function(models) {
                User.belongsToMany(models.Session, {
                    through: {
                        model: models.UserSession,
                        unique: false
                    },
                    foreignKey: 'UserEmail'
                });
                User.hasMany(models.Vote, {
                    foreignKey: 'UserEmail',
                });
            }
        }
    });
    return User;
};
