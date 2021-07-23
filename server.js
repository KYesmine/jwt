const express = require('express')
const expressLayout = require('express-ejs-layouts')
const morgan = require('morgan')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { requireAuth, checkUser } = require('./middlewares/authMiddleware')

require('dotenv').config()

const app = express()
const authRouter = require('./routes/authRouter')

// Middlewares
app.use(express.static('public'))
app.use(expressLayout)
app.use(express.json())
app.use(helmet())
app.use(cors({
    origin: 'http://localhost:3001'
}))
app.use(cookieParser())
app.use(morgan('dev'))

// View engine
app.set('view engine', 'ejs')
app.set('views', 'views')
app.set('layout', 'layouts/layout')
app.set("layout extractScripts", true)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(response => app.listen(process.env.PORT))
    .catch(err => {
        console.error(err)
        res.send('Connection to database faild!')
    })

//Routes
app.get('*', checkUser)
app.get('/', (req, res) => res.status(200).render('home', { title: 'home' }))
app.get('/smoothies', requireAuth, (req, res) => res.status(200).render('smoothies', { title: 'smoothies' }))
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