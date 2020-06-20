const express = require('express')
const Router = express.Router()
const mysqlConnection = require('../models/connection')


Router.get("/", (req, res) => {
	const SELECT_ALL_PRODUCTS_QUERY = "SELECT * FROM tutorial.products"
	mysqlConnection.query(SELECT_ALL_PRODUCTS_QUERY, (error, results, fields) => {
		if(error) {
			res.send("Error: " + error)
		} else {
			res.send({data: results})
		}
	})
})

Router.get("/add", (req, res) => {
	const { name, price } = req.query
	const INSERT_PRODUCT_QUERY = `INSERT INTO tutorial.products (name, price) VALUES ('${name}', '${price}')`
	mysqlConnection.query(INSERT_PRODUCT_QUERY, (error, results) => {
		if(error) {
			res.send("Error: " + error)
		} else {
			res.send({data: results})
			
		}
	})
})

module.exports = Router