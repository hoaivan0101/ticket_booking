const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String},
    username: {type: String},
    password: {type: String},
    googleid: { type: String },
    avatar: {type: String}
    },
    {
        collection: 'user'
    }
);

userSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel