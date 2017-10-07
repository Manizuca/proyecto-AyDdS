module.exports = (sequelize, DataTypes) => {
    var Decision = sequelize.define("Decision", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        mecanism: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: false
        },
        result: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Decision.hasMany(models.Vote);
            }
        }
    });
    return Decision;
};
