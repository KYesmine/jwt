const express = require('express')
const expressLayout = require('express-ejs-layouts')
const morgan = require('morgan')
const mongoose = require('mongoose')
const helmet = require('helmet')

require('dotenv').config()

const app = express()
const authRouter = require('./routes/authRouter')

// Middlewares
app.use(express.static('public'))
app.use(expressLayout)
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

// View engine
app.set('view engine', 'ejs')
app.set('views', 'views')
app.set('layout', 'layouts/layout')
app.set("layout extractScripts", true)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => app.listen(process.env.PORT))
    .catch(err => console.log(err))

//Routes
app.get('/', (req, res) => res.render('home', { title: 'home' }))
app.get('/smoothies', (req, res) => res.render('smoothies', { title: 'smoothies' }))
app.use(authRouter)

app.use((req, res, next) => {
    const error = new Error(`404! Page Not Found! - ${req.originalUrl}`)
    res.status(404)
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    })
})