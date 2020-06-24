const express = require('express')
const Router = express.Router()

const writingController = require("../controllers/Writing")

// Writing
// app.route('/chapter/list')
// 	.get(writingController.getSectionsByChapters)
Router.get('/chapter/list',	writingController.getChaptersAndSections)
Router.get('/chapter/edit', 	writingController.editChapter)
Router.get('/chapter/add', 	writingController.addChapter)
Router.get('/chapter/:id', 	writingController.getChapter)
Router.get('/chapter', 			writingController.getAllChapters)

Router.get('/section/edit', 	writingController.editSection)
Router.get('/section/add', 	writingController.addSection)
Router.get('/section/:id', 	writingController.getSection)
Router.get('/section', 			writingController.getAllSections)

module.exports = Router