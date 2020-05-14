const express = require('express')
const mongoose = require('mongoose')
const shortUrl = require('./app/models/shortUrl')
const routes = express.Router()

mongoose.connect('mongodb://localhost/shortUrls', {
    useNewUrlParser: true, useUnifiedTopology: true
}) 

routes.get("/", async function (req, res) {
    const shortUrls = await shortUrl.find()
    return res.render("index", { shortUrls })
})


routes.post("/shortUrls", async function (req, res) {
    await shortUrl.create({ full: req.body.fullUrl })
    
    return res.redirect('/')
})

routes.get("/:shortUrl", async function (req,res) {
    const ShortUrl = await shortUrl.findOne({ short: req.params.shortUrl })
    if (ShortUrl == null) return res.sendStatus(404)

    res.redirect(ShortUrl.full)
})

module.exports = routes