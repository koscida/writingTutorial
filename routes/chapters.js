const express = require('express')
const Router = express.Router()

const chapterController = require("../controllers/Chapters")

Router.get('/list', 		chapterController.getAllChapters)
Router.get('/update',	chapterController.updateChapter)
Router.get('/delete',	chapterController.deleteChapter)
Router.get('/add', 		chapterController.addChapter)
Router.get('/:id', 		chapterController.getChapter)


module.exports = Router