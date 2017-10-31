function Rooms(roomModel) {
  this.roomModel = roomModel;
};

Rooms.prototype.createRoom = function() {
  this.roomModel.create({ titulo: 'TITULO', purpose: 'DESCRIPCION'})
    .then(room => {console.log(room.get('uuid'));})
    .catch(err => {console.log(err);});
};
Rooms.prototype.addParticipant = function(userID) {};
Rooms.prototype.addScenario = function(roomUUID) {};
Rooms.prototype.deleteScenario = function(roomUUID, scenarioUUID) {};
Rooms.prototype.changeTitle = function(roomUUID, title) {
  this.roomModel.update({titulo: title},
  { where: { uuid: roomUUID } })
  .then(() => {})
};
Rooms.prototype.changePurpose = function(roomUUID, purpose) {
  this.roomModel.update({purpose: purpose},
  { where: { uuid: roomUUID } })
  .then(() => {})
};

module.exports = Rooms;
