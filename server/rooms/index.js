function Rooms(models) {
    this.roomModel = models.Session;
    this.userModel = models.User;
    this.voteModel = models.Vote;
    this.sceneModel = models.Scenario;
    this.userSessionModel = models.UserSession;
    this.Sequelize = models.sequelize;

    var self = this;
    this.userModel.findOrCreate({where: {email: 'guest'}, defaults: {hash: 'a7534c82ecbb2e2c3b8ade1a67d106fc289a23974559899effd571d85c082ed3', salt: '4dSBRfVXVA'}})
        .spread((user, created) => { self.guestUser = user; });
};

Rooms.prototype.createRoom = function() {
    var roomModel = this.roomModel;
    return new Promise(function(resolve, reject) {
        roomModel.create({ titulo: 'TITULO', purpose: 'DESCRIPCION'})
            .then(room => { resolve(room.uuid); })
            .catch(err => { reject(err); });
})};

Rooms.prototype.addParticipant = function(roomUUID, userMail, sID) {
    var self = this;
    return new Promise(function(resolve, reject) {
        self.roomModel.findOne({ where: {uuid: roomUUID} })
            .then(room => {
                if (!room)
                    resolve(false);

                if (sID && !userMail) {
                    promise = room.addUser(self.guestUser, { limit: 0, guestSID: sID });
                } else {
                    promise = self.userModel.findOne({ where: {email: userMail} })
                        .then(user => { return room.addUser(user); });
                }

                return promise.then(() => { resolve(true); })
                    .catch(err => { reject(err); });
            }).catch(err => { reject(err); });
})};

Rooms.prototype.checkInRoom = function(roomUUID, userMail, sID) {
    if (sID && !userMail) {
        promise = this.userSessionModel.findOne({ where: {UserEmail: 'guest', SessionUUID: roomUUID, guestSID: sID} });
    } else {
        promise = this.userSessionModel.findOne({ where: {UserEmail: userMail, SessionUUID: roomUUID} });
    }

    return new Promise(function(resolve, reject) {
        promise.then(userSession => {
            if (userSession) {
                resolve(true);
            } else {
                resolve(false);
            }
    })});
};

Rooms.prototype.getScenes = function(roomUUID) {
    promise = this.sceneModel.findAll({ where: {SessionUuid: roomUUID} });

    return new Promise(function(resolve, reject) {
        promise.then(scenes => {
            if (scenes) {
                resolve(scenes);
            } else {
                resolve([]);
            }
    })});
};

Rooms.prototype.addScenario = function(roomUUID) {};

Rooms.prototype.deleteScene = function(roomUUID, scene) {};

Rooms.prototype.changeTitle = function(roomUUID, title) {
    this.roomModel.update({titulo: title}, { where: { uuid: roomUUID } })
        .then(() => {})
};

Rooms.prototype.changePurpose = function(roomUUID, purpose) {
    this.roomModel.update({purpose: purpose}, { where: { uuid: roomUUID } })
        .then(() => {})
};

module.exports = Rooms;
