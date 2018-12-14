const errors = require('restify-errors');

function contactController() {
  const Contact = require('../model/Contact');
  const User = require('../model/User');
  this.listContacts = function (req, res, next) {
    Contact.find({h: req.user.id}, 'p')
    .populate('p', '_id username')
    .exec((err, docs) => {
      res.send(docs.map(item => item.p));
      next()
    });
  };
  
  this.addContact = function (req, res, next) {
    var havalid = req.user.id;
    console.log(havalid);
    var palangUsername = req.body.newContact;
    console.log(palangUsername);

    User.findOne({ username: palangUsername }, function (err, doc) {
      if (err) {
        console.error(err);
        return next(new errors.InternalError(err.message));
      }
      console.log("doc:" + doc)
      if (doc == null) {
        console.log("in if ????????:")
        return next(
          new errors.InvalidContentError("rahmani khare")
        );
      }
      console.log("ready to save")
      var palangID = doc._id;
      var tmp = new Contact({ "h": havalid, "p": palangID })
      console.log(tmp)

      Contact.find(tmp, function (err2, con) {
        if (err2) {
          console.error(err2);
          return next(new errors.InternalError(err2.message));
        }
        console.log("con:" + con)
        if (con != null) {
          return next(new errors.ConflictError("contact exist"))
        } else {
          tmp.save(function (err) {
            if (err) {
              console.error(err);
              return next(new errors.InternalError(err.message));
            }
            res.send(201);
            next();
          });
        }
      });


    });

  }
}

module.exports = new contactController();