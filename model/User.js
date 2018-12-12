const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema(
{
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  display_name: {
    type: String,
    trim: true,
  },
},
{ minimize: false },
);

UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

const User = mongoose.model('User', UserSchema);
module.exports = User;