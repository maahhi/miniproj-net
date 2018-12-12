const mongoose = require('mongoose');
const User = require('../model/User');
const errors = require('restify-errors');

module.exports = function(req, res, next){

  let user = new User(req.body);
  user.save(function(err) {
    if (err) {
      console.error(err);
      return next(new errors.InternalError(err.message));
      next();
    }

    res.send(201);
    next();
  });
};