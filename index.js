const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const userRouter = require('./userRouter')

const app = express()
app.use(helmet())
app.use(cors())

// const logger = (req, res, next) => {
//     // console.log('Hey turtles')
//     // execute some logic
//     console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
//     next()
// }

// app.use(logger)


const mw1 = (req, res, next) => {
    console.log('middleware 1')
    next()
}

const mw2 = (req, res, next) => {
    console.log('middleware 2')
    next()
}

const mw3 = (req, res, next) => {
    console.log('middleware 3')
    next()
}

console.log(__dirname + '/public')

app.use(express.json()) // get a json payload
// app.use(express.urlencoded({ extended: false })) // get x-www-form-url-encoded

app.use(express.static(__dirname + '/public'))

// app.use(morgan('tiny'))
app.use('/users', userRouter)

app.get('/', (req, res, next) => {
    res.send('Home page')
})

const authorization = (req, res, next) => {
    console.log('Checking user authorization... Welcome admin!')
    const { token } = req.params
    const secretPassword =  "turtle"
    if (!token || token !== secretPassword) {
        return res.status(401).send('Unauthorized access')
    } else {
        req.turtle = true;
        next()
    }
}

app.get('/admin/:token?', authorization, (req, res) => {
    res.send('Admin page')
    console.log(req.admin)
})

// app.get('/admin/:token?', [mw1, mw2, mw3, authorization], (req, res) => {
//     res.send('Admin page')
//     console.log(req.admin)
// })

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})