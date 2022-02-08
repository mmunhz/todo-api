const express = require("express")
const router = require("express").Router()

const ToDoItemController = require("../controller/ToDoItemController")

router.get('/', ToDoItemController.getToDoItems)


module.exports = router