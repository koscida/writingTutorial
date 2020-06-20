const express = require('express')
const Router = express.Router()

module.exports = Router.get("/", (req, res) => {
	res.send("go to /people or /products")
})