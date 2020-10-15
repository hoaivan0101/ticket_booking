const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const sessSchema = new Schema({
    showDate: {type: String, required: true},
    showTime: {type: String, required: true},
    hall: {type: Number, required: true},
    movie: {type: String, required: true},
    cinema: {type: String, required: true},
    location: {type: String, required: true}
    },
    {
        collection: 'sess'
    })

const SessModel = mongoose.model('sess', sessSchema)

module.exports = SessModel