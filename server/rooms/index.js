function Rooms(roomModel) {
  this.roomModel = roomModel;
};

Rooms.prototype.createRoom = function() {
  this.roomModel.create({ titulo: 'TITULO', purpose: 'DESCRIPCION'})
    .then(holito => {})
    .catch(err => {console.log(err);});
};
Rooms.prototype.addParticipant = function(userID) {};
Rooms.prototype.addScenario = function(roomUUID) {};
Rooms.prototype.deleteScenario = function(roomUUID, scenarioUUID) {};
Rooms.prototype.changeTitle = function(roomUUID, title) {};
Rooms.prototype.changePurpose = function(roomUUID, purpose) {};

module.exports = Rooms;
