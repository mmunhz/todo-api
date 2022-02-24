const express = require('express')
const { ToDoItem, ToDoItemDAO, ValidationError } = require('../model/ToDoItem')

module.exports = class ToDoItemController {

    static async insert(req, res) {
        try {
            const toDo = ToDoItem.fromJSON(req.body)
            const response = await ToDoItemDAO.getInstance().insert(toDo)

            res.status(201).json({
                message: "ToDo successfully created.",
                insertedCount: response
            })

        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(422).json({
                    message: error.message
                })
            } else {
                res.status(500).json({
                    message: "Internal error. Database query failed."
                })
                throw error
            }
        }
    }

    static async getAll(req, res) {
        try {
            const response = await ToDoItemDAO.getInstance().getAll()
            if (response) {
                res.status(200).json({
                    message: "ToDos successfully retrieved.",
                    items: response
                })
            }
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
            throw error
        }
    }

    static async getOneById(req, res) {
        const id = req.params.id
        try {
            const response = await ToDoItemDAO.getInstance().getOneById(id) || null
            if (response) {
                res.status(200).json({
                    message: "ToDo successfully retrieved.",
                    item: response
                })
            } else {
                res.status(404).json({ message: "ToDo not found." })
            }
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed."
            })
            throw error
        }
    }

    static async removeOneById(req, res) {
        const id = req.body
        try {
            const response = await ToDoItemDAO.getInstance().removeOneById(id)
            res.status(200).json({
                message: "ToDo successfully deleted.",
                deletedCount: response
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal error. Database query failed.",
            })
            throw error
        }

    }

    static async updateOneById(req, res) {
        try {
            const response = await ToDoItemDAO.getInstance().updateOneById(req.body)
            res.status(200).json({
                message: "ToDo successfully updated.",
                modifiedCount: response
            })
        } catch (error) {
            if (error instanceof ValidationError) {
                res.status(422).json({
                    message: error.message
                })
            }
            else {
                res.status(500).json({
                    message: "Internal error. Database query failed."
                })
                throw error
            }
        }
    }
}
