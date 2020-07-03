const express = require('express')
const Router = express.Router()

const characterController = require("../controllers/Characters")

// Router.get('/update',	chapterController.editChapter)
// Router.get('/delete',	chapterController.deleteChapter)
// Router.get('/add', 		chapterController.addChapter)
// Router.get('/:id', 		chapterController.getChapter)
Router.get('/', 			characterController.getAllCharacters)

module.exports = Router