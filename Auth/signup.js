const mongoose = require('mongoose');
const User = require('../model/User');
const errors = require('restify-errors');

module.exports = function(req, res, next){

  if (!req.body.username || ! req.body.password) {
    return next(new errors.BadRequestError());
  }
  User.findOne({ username: req.body.username }, function(err, doc) {
    if (err) {
      return next(new errors.InternalError(err.message));
    }
    if (doc != null)
    {
      return next(new errors.ConflictError("username exist"))
    }
    else {
      let user = new User(req.body);
      user.save(function(err) {
        if (err) {
          return next(new errors.InternalError(err.message));
        }

        res.send(201);
        next();
      });
    }
  });


};