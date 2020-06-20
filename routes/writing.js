const express = require('express')
const Router = express.Router()

const writingController = require("../controllers/Writing")

// Writing
// app.route('/chapter/list')
// 	.get(writingController.getSectionsByChapters)
Router.use('/chapter/list',	writingController.getChaptersAndSections)
Router.get('/chapter/add', 	writingController.addChapter)
Router.use('/chapter/', 			writingController.getAllChapters)

Router.get('/section/add', 	writingController.addSection)
Router.get('/section', 			writingController.getAllSections)

module.exports = Router