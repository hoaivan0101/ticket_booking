const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema(
    {
        customerId: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
        sessionId: {type: Schema.Types.ObjectId, ref: 'Session', required: true},
        seatSelected: {type: [seatSelectedSchema], required: true},
        snack: {type: [snackSchema]}
    },
    {
        collection: 'cart'
    }
)

const seatSelectedSchema = new Schema(
    {
        seatSelected: {type: Array, required: true}
    }
)

const snackSchema = new Schema(
    {
        item: {type: String, required: true},
        price: {type: Number, required: true},
    }
)

const CartModel = mongoose.model('cart', cartSchema)

module.exports = CartModel