const mongoose = require('mongoose');
const mongooseStringQuery = require('mongoose-string-query');
const timestamps = require('mongoose-timestamp');

const MessageSchema = new mongoose.Schema(
    {
        sender_id: {
            type: String,
            required: true,
            trim: true,
        },
        receiver_id: {
            type: String,
            required: true,
            trim: true,
        },
        text: {
            type: String,
        },
    },
    { minimize: false },
);

MessageSchema.plugin(timestamps);
MessageSchema.plugin(mongooseStringQuery);

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;