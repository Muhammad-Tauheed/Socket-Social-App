const mongoose = require('mongoose');
const { Schema } = mongoose;

const smsSchema = new Schema({
    message: {
        type: Object
    },
    file_upload: {
        type: Object
    },
    sender_id: {
        type: Object,
        required: true
    },
    receiver_id: {
        type: Object,
        required: true
    },
    unread: {
        type: Object,
    }
}, {
    timestamps: {}
});

module.exports = mongoose.model('Sms', smsSchema);

 









