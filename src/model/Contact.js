const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const ContactSchema = new mongoose.Schema(
{
  h: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  p: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
},
{ minimize: false },
);

ContactSchema.plugin(timestamps);
ContactSchema.plugin(mongooseStringQuery);

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;