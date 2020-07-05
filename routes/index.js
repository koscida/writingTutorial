const express = require('express');
const Router = express.Router();

const HomeRoute = require("./home")
const ChaptersRoutes = require("./chapters")
const CharactersRoutes = require("./characters")

// Site Index
Router.use("/", HomeRoute)

// Writing
Router.use('/chapter/', ChaptersRoutes)
Router.use('/chapters/', ChaptersRoutes)

Router.use('/character/', CharactersRoutes)
Router.use('/characters/', CharactersRoutes)


module.exports = Router;