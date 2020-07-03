const express = require('express')
const Router = express.Router()

module.exports = Router.get("/", (req, res) => {
	res.send("go to <a href='/chapter'>/chapter</a> or <a href='/character'>/character</a>")
})