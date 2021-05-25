const mongoose = require('mongoose');

const ipTrackerSchema = mongoose.Schema({
    ip_Addr: String
})

const ipTrackerModel = mongoose.model('iptrackerDB', ipTrackerSchema);

module.exports = ipTrackerModel;