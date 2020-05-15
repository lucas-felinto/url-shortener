const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

app.set("view engine", "njk")

nunjucks.configure("app/views", {
    express: app,
    noCache: true,
    autoescape:false
})

app.listen(5000, function() {
    console.log('server running')
})