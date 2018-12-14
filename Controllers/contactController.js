const errors = require('restify-errors');

function contactController() {
  const Contact = require('../model/Contact');
  const User = require('../model/User');
  this.listContacts = function (req, res, next) {
    res.send("HElloz");
    next()
  }
  this.addContact = function (req, res, next) {
    res.send("HElloz2");
    var havalid = req.user.id ;
    console.log(havalid);
    var palangUsername = req.body.newContact;
    console.log(palangUsername);
    
    User.findOne({ username: palangUsername }, function(err, doc) {
			if (err) {
        console.error(err);
        return next(new errors.InternalError(err.message));
      }
      console.log("doc:" + doc)
      if (doc == null){
        console.log("in if ????????:" )
        return next(
					new errors.InvalidContentError("rahmani khare")
        );
      }
      var palangID =doc._id;
      var tmp = new Contact({"h":havalid,"p":palangID})
      tmp.save(function(err){
        if (err) {
          console.error(err);
          return next(new errors.InternalError(err.message));
        }
        res.send(201);
        next();
      });
    });
    
  }
}

module.exports = new contactController();