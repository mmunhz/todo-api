const express = require('express')
const ToDoItem = require('../model/ToDoItem')

module.exports = class ToDoItemController {

    static async addToDoItem(req, res) {
        const { name, description, deadline } = req.body
        const toDo = new ToDoItem(name, description, deadline)

        try {
            await toDo.save()
            res.status(201).json({ message: "ToDo Item succesuly added to the database." })
        } catch (error) {
            req.status(500).json({ message: "Internal error. Database query failed." })
            throw error
        }
    }

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
            throw error
        }

    }

    static async getToDoItemById(req, res) {
        const id = req.params.id

        try {
            const toDoItem = await ToDoItem.getToDoItemById(id)
            res.status(200).json({
                item: toDoItem,
                message: "Retrieved ToDoItem from database succesfully."
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
            throw error
        }
    }

    static async removeToDoItemById(req, res) {
        const id = req.body
        try {
            await ToDoItem.removeById(id)
            res.status(200).json({
                message: "ToDo Item succesfully removed."
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
            throw error
        }
    }

    async updateToDoItem(req, res) {
        const { id, name, description, deadline, done } = req.body

        try {
            const toDoItem = new ToDoItem(name, description, deadline, done)
            await toDoItem.updateById(id)
            res.status(200).json({
                message: "ToDo Item succesfuly edited"
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
        }

    }

}