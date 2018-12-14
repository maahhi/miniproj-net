const mongoose = require('mongoose');
const User = require('../model/User');
const errors = require('restify-errors');

const config = require('../config');
const rjwt = require('restify-jwt-community');
const jwt = require('jsonwebtoken');

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
      let token = jwt.sign({"username":varusername,"id":doc._id}, config.jwt.secret, {
        expiresIn: '15m' // token expires in 15 minutes
    });
    jwt.decode(token);
    console.log(doc)
    res.send({"token":token, "display_name":doc.display_name});
			next();
		});
};