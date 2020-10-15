const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    cinema: {type: String, required: true},
    location: {type: String, required: true},
    showDate: {type: String, required: true},
    showTime: {type: String, required: true},
    hall: {type: String, required: true},
    movie: {type: String, required: true},
    price: {type: Number, required: true},
    seatAvailable: { type: Number, required: true },
    seat: Array,
    // seat: [
    //     [ 0, 0, 0, 0, 0, 0, 0, 0],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0],
    //     [ 0, 0, 0, 0, 0, 0, 0, 0],
    // ],
    snack: {type: Schema.Types.ObjectId, ref: 'Cart'}
    },
    {
        collection: 'session'
    }
);

const SessionModel = mongoose.model('session', sessionSchema)

module.exports = SessionModel