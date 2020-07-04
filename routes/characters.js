const express = require('express')
const Router = express.Router()

const characterController = require("../controllers/Characters")

Router.get('/list', 		characterController.getAllCharacters)
Router.get('/groups', 	characterController.getAllGroups)
// Router.get('/update',	characterController.editCharacter)
// Router.get('/delete',	characterController.deleteCharacter)
// Router.get('/add', 		characterController.addCharacter)
Router.get('/:id', 		characterController.getCharacter)
Router.get('/', 			characterController.getAllCharacters)

module.exports = Router