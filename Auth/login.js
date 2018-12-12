const mongoose = require('mongoose');
const User = require('../model/User');
const errors = require('restify-errors');


module.exports = function(req, res, next){
    console.log(req.body);
    var varusername = req.body.username;
    var varpassword = req.body.password;
    var vardisplayname = req.body.displayname;
    console.log(varusername +" "+ varpassword+" "+vardisplayname);
    let doc = new User();
    User.findOne({ username: varusername }, function(err, doc) {
			if (err) {
        console.error(err);
        return next(new errors.InternalError(err.message));
      }
      console.log(doc)
      if (doc == null){
        return next(
					new errors.InvalidContentError("rahmani khare"),
        );
      }
      if (varpassword != doc.password){
        console.log("not match");
        res.send("NOK");
			  return next(new errors.UnauthorizedError());
      }
			res.send("OK");
			next();
		});
};