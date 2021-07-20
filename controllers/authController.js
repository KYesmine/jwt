const User = require('../models/User')

module.exports.get_login = (req, res) => {
    res.render('auth/login', { title: 'login' })
}

module.exports.post_login = (req, res) => {
    console.log(req.body)
}

module.exports.get_signup = (req, res) => {
    res.render('auth/signup', { title: 'signup' })
}

module.exports.post_signup = (req, res) => {
    console.log(req.body)
}