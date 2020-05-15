const express = require('express')
const mongoose = require('mongoose')
const shortUrl = require('./app/models/shortUrl')
const routes = express.Router()

mongoose.connect('mongodb+srv://w-1-5-j-1-4-s:w-1-5-j-1-4-s@cluster0-9acsi.mongodb.net/shortUrls?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
})

let lastUrl = ''

routes.get("/", async function (req, res) {
    const url = await shortUrl.findOne({ full: lastUrl })
    lastUrl = ''
    return res.render("index", { url })
})

routes.get("/shortUrls", async function (req,res) {
    return res.redirect("/")
})

routes.post("/shortUrls", async function (req, res) {
    lastUrl = req.body.fullUrl
    const alreadyExist = await shortUrl.findOne({ full: lastUrl })

    let results = null
    if(!alreadyExist) {
        try {
            results = await shortUrl.create({ full: lastUrl })
        } catch (error) {
            console.error(error)
        }
    }

    if(results) lastUrl = results.full

    return res.redirect("/")
})

routes.get("/:shortUrl", async function (req,res) {
    const ShortUrl = await shortUrl.findOne({ short: req.params.shortUrl })
    if (ShortUrl == null) return res.sendStatus(404)

    return res.redirect(ShortUrl.full)
})

module.exports = routes