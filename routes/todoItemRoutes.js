const express = require("express")
const router = require("express").Router()

const ToDoItemController = require("../controller/ToDoItemController")

router.get('/', ToDoItemController.getAll)
router.get('/:id', ToDoItemController.getOneById)
router.post('/add', ToDoItemController.insert)
router.delete('/remove', ToDoItemController.removeOneById)
router.patch('/edit', ToDoItemController.updateOneById)

module.exports = router