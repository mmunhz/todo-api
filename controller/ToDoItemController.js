const express = require('express')
const todoItem = require('../model/ToDoItem')

module.exports = class ToDoItemController {

    static async getToDoItems(req, res) {
        try {
            const toDos = await todoItem.getToDoItems()

            res.status(200)
                .json({
                    items: toDos,
                    message: "All ToDoItems we're retrieved from database with success."
                })
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
        }

    }

}