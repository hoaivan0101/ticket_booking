const UserModel = require('../models/user') 

exports.userInfo = (req, res, next) => {
    UserModel.findById(req.params.id)
    .then(data => {
        res.render('user', {userInfo: data})
    })
    .catch(err => {
        throw err
    })
}

exports.userLogin = (req, res, next) => {
    UserModel.findOne({
        email: req.body.email
    })
    .then(data => {
        bcrypt.compare(req.body.password, data.password, (err, same) => {
            if (same) {
                res.redirect('/' + req.params.id)
            }
        })
    })
    .catch(err => {
        throw err
    })
}