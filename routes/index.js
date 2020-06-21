const express = require('express');
const Router = express.Router();

const HomeRoute = require("./home")
const PeopleRoutes = require("./people")
const ProductsRoutes = require("./products")
const WritingRoutes = require("./writing")

// Site Index
Router.use("/", HomeRoute)

// Testing
Router.use("/people", PeopleRoutes)
Router.use("/products", ProductsRoutes)

// Writing
Router.use('/writing/', WritingRoutes)


module.exports = Router;