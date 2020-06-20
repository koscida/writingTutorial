const express = require('express');
const Router = express.Router();

const SiteRoute = require("./root")
const PeopleRoutes = require("./people")
const ProductsRoutes = require("./products")
const WritingRoutes = require("./writing")

// Site Index
Router.use("/", SiteRoute)

// Testing
Router.use("/people", PeopleRoutes)
Router.use("/products", ProductsRoutes)

// Writing
Router.use('/writing/', WritingRoutes)


module.exports = Router;