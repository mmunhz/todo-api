const express = require("express")
const router = require("express").Router()

const ToDoItemController = require("../controller/ToDoItemController")

router.get('/', ToDoItemController.getToDoItems)
router.get('/:id', ToDoItemController.getToDoItemById)
router.post('/add', ToDoItemController.addToDoItem)
router.delete('/remove', ToDoItemController.removeToDoItemById)
router.patch('/edit', ToDoItemController.updateToDoItem)

module.exports = router