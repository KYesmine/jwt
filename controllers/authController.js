const User = require('../models/User')
const jwt = require('jsonwebtoken')

const handleUserErrors = (err) => {
    const errors = {email: "", password: ""}

    if(err.code === 11000) {
        errors['email'] = 'This email is already registred'
    }

    if(err.name === 'UserLoginException') {
        errors[err.type] = err.message
    }

    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = user => {
    return jwt.sign({ user }, process.env.JWT_SECRET_CODE, {
        expiresIn: maxAge
    })
}

const login = (user, res) => {
    const token = createToken(user)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })
}

module.exports.get_login = (req, res) => {
    res.render('auth/login', { title: 'login' })
}

module.exports.post_login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        login(user, res)
        res.status(200).json({ user: user._id })
    } catch(err) {
        const errors = handleUserErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.get_signup = (req, res) => {
    res.render('auth/signup', { title: 'signup' })
}

module.exports.post_signup = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.create({ email, password })
        login(user, res)
        res.status(201).json({ user: user._id })
    } catch(err) {
        console.error(err)
        const errors = handleUserErrors(err.message)
        res.status(400).json({errors})
    }
}

module.exports.get_logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}