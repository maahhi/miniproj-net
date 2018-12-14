function contactController() {
  const Contact = require('../model/Contact');

  this.listContacts = function (req, res, next) {
    res.send("HElloz");
    next()
  }
}

module.exports = new contactController();