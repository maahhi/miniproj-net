const Message = require('../model/Message')

function messageController() {

  this.getHistory = function (req, res, next) {
    let myID = req.user.id;
    let otherID = req.params.id;
    Message.find({
      $or: [
        {$or: [{sender_id:myID, receiver_id:otherID}]},
        {$or: [{sender_id: otherID, receiver_id: myID}]}
      ]
    })
    .sort({createdAt: 1})
    .exec( (err, docs) => {
      if(err) {
        res.send("ERR");
        next()
      }
      res.send(docs);
      next()
    })
  };

  this.getLastContactMessages = function (req, res, next) {
    let myID = req.user.id;
    let otherID = null;
    Message.findOne({sender_id:myID, receiver_id:otherID}).sort("-createdAt").exec(function (err ,m1) {
      Message.find({sender_id: otherID, receiver_id: myID}).sort("-createdAt").exec(function (err2,m2) {
        if (m1.createdAt> m2.createdAt)
          res.send(m1);
        else res.send(m2);
        next();

      })

    });
  }
}

module.exports = new messageController()