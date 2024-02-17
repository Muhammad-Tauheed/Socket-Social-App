const mongoose = require('mongoose');
const smsSchema = new mongoose.Schema({
    message: {
        type: Object
    },
    file_upload: {
        type:Object
    },
    unread: {
        type:Object,
    },
    name:{}
},
{
    timestamps: {}
})
module.exports = mongoose.model('Sms', smsSchema);
 









