const express = require('express')
const { ToDoItem, ValidationError } = require('../model/ToDoItem')

module.exports = class ToDoItemController {
    /**
     * Add ToDo Item route
     * @param {*} req 
     * @param {*} res 
     */
    static async addToDoItem(req, res) {
        const { name, description, deadline } = req.body
        if (!name) {
            res.status(422).json({ message: "The name property is required." })
            return
        }
        const toDo = new ToDoItem(name)

        if (description) toDo.description = description
        if (deadline) toDo.deadline = new Date(deadline).toUTCString()

        try {
            await toDo.save()

            res.status(201).json({ message: "ToDo Item succesuly added to the database." })
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(422).json({ message: error.message, debug: req.body.name })
            } else {
                res.status(500).json({ message: "Internal error. Database query failed." })
            }
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
        if (!req.body._id) {
            res.status(422).json({
                message: "ToDO Item id is missing."
            })
        }

        const updateObject = {}
        const id = req.body._id

        if (req.body.deadline) {
            updateObject.deadline = new Date(req.body.deadline).toUTCString()
        }

        for (const prop of ['name', 'description', 'done']) {
            if (prop in req.body) {
                updateObject[prop] = req.body[prop]
            }
        }

        try {
            await ToDoItem.updateById(updateObject, id)
            res.status(200).json({
                message: "ToDo Item succesfuly edited."
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
        }

    }

}
