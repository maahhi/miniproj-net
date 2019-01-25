const Message = require('../model/Message')

function messageController() {

  this.getHistory = function (req, res, next) {
    let myID = req.user.id
    let otherID = req.body.id
    Message.find({sender_id:myID, receiver_id:otherID}).then((doc) =>
    {
      doc2 = Message.find({sender_id:otherID, receiver_id:myID})
    })
  }

  this.getLastContactMessages = function (req, res, next) {
    let myID = req.user.id
    let otherID = null;
  }
}

module.exports = new messageController()