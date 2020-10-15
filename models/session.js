const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    cinema: {type: String, required: true},
    location: {type: String, required: true},
    showDate: {type: Date, required: true},
    showTime: {type: Date, required: true},
    hall: {type: String, required: true},
    movie: {type: Schema.Types.ObjectId, ref: 'Movie', required: true},
    price: {type: Number, required: true},
    seatAvailable: {type: Number, required: true},
    seatMap: [
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    snack: {type: Schema.Types.ObjectId, ref: 'Cart'}
    },
    {
        collection: 'cart'
    }
);

const SessionModel = mongoose.model('session', sessionSchema)

module.exports = SessionModel