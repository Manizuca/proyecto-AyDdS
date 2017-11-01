module.exports = (sequelize, DataTypes) => {
    var UserSession = sequelize.define("UserSession", {
        UserEmail: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        SessionUUID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        guestSID: {
            type: DataTypes.STRING,
            defaultValue: '',
            primaryKey: true
        }
    });
    return UserSession;
};
