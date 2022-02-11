const client = require("../db/conn")
const config = require('../conf/config')
const { ObjectId } = require("mongodb")

class ValidationError extends Error { }

class ToDoItem {
    constructor(name) {
        this.name = name
        this.description = ""
        this.deadline = ""
        this.done = false
    }

    /**
     * Check if it is a valid instance of a ToDo Item. 
     * Instance is valid if it's name property isn't empty and
     * has at least one non space character.
     * @returns true if it's valid or false if it's not.
     */
    isValid() {
        return this.name.trim().length > 0
    }

    /* CRUD Operations */

    /**
     * Save ToDoItem into database
     */
    async save() {
        if (!this.isValid()) {
            throw new ValidationError("A valid name is required.")
        }

        try {
            await client.db()
                .collection(config.db.collections.todoItems)
                .insertOne(this)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Retrieve All ToDo Items from database 
     * @returns ToDoItem Array
     */
    static async getToDoItems() {
        try {
            const products = await client.db()
                .collection(config.db.collections.todoItems)
                .find().toArray()
            return products
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Retrieve ToDoItem with the given ID from database
     * @param {*} id 
     * @returns ToDoItem 
     */
    static async getToDoItemById(id) {
        try {
            const product = await client.db()
                .collection(config.db.collections.todoItems).findOne({ _id: ObjectId(id) })
            return product
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Remove ToDoItem with the given ID from darabase
     * @param {*} id 
     */
    static async removeById(id) {
        try {
            await client.db().collection(config.db.collections.todoItems).deleteOne({ _id: ObjectId(id) })
            return
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Update ToDo item with the ID into the database
     * @param {*} updateObject - Object with the properties to be updated.
     * @param id - Id of the ToDo Item wich will be updated 
     */
    static async updateById(updateObject, id) {
        // Check if update object has a valid name property
        if (updateObject.name) {
            if (!updateObject.name.trim().length > 0) {
                delete updateObject.name
            }
        }

        try {
            await client.db().collection(config.db.collections.todoItems)
                .updateOne({
                    _id: ObjectId(id)
                },
                    { $set: updateObject }
                )
        } catch (error) {
            console.error(error)
            throw error
        }
    }


}

module.exports = { ToDoItem, ValidationError }
