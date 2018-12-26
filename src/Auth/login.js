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

  User.findOne({ username: varusername })
  .then((doc) => {
    console.log(doc);
    if (doc == null){
      return next(
        new errors.InvalidContentError("User doesn't exist!")
      );
    }
    if (varpassword !== doc.password){
      console.log("not match");
      return next(
        new errors.UnauthorizedError("Password is incorrect!")
      );
    }
    let token = jwt.sign({"username":varusername,"id":doc._id}, config.jwt.secret, {
      expiresIn: '15m' // token expires in 15 minutes
    });
    jwt.decode(token);
    res.send({"token":token, "display_name":doc.display_name});
    next();
  })
  .catch((err) => {
    return next(new errors.InternalError(err.message) )
  })
};