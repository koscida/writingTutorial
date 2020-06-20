const express = require('express')
const Router = express.Router()
const mysqlConnection = require('../models/connection')

Router.get("/", (req, res) => {
	mysqlConnection.query("SELECT * FROM people", (error, results, fields) => {
		if(!error) {
			res.send(results)
		} else {
			console.log("Error in query: " + error)
		}
	})
})

module.exports = Router