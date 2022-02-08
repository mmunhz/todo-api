const express = require('express')
const ToDoItem = require('../model/ToDoItem')

module.exports = class ToDoItemController {
    /**
     * Add ToDo Item route
     * @param {*} req 
     * @param {*} res 
     */
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

    /**
     * Retrieve ToDo Items list route
     * @param {*} req 
     * @param {*} res 
     */

    static async getToDoItems(req, res) {
        try {
            const toDos = await ToDoItem.getToDoItems()

            res.status(200)
                .json({
                    items: toDos,
                    message: "All ToDo Items we're succesfully retrieved from database."
                })
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
            throw error
        }

    }

    /**
     * Retrieve ToDo Item route
     * @param {*} req 
     * @param {*} res 
     */
    static async getToDoItemById(req, res) {
        const id = req.params.id
        try {
            const toDoItem = await ToDoItem.getToDoItemById(id)
            res.status(200).json({
                item: toDoItem,
                message: "Retrieved ToDoItem successfuly from database."
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
            throw error
        }
    }

    /**
     * Remove ToDo Item route 
     * @param {*} req 
     * @param {*} res 
     */
    static async removeToDoItemById(req, res) {
        const id = req.body.id
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

    /**
     * Update ToDo Item route 
     * @param {*} req 
     * @param {*} res 
     */
    static async updateToDoItem(req, res) {
        try {
            await ToDoItem.updateById(req.body)
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