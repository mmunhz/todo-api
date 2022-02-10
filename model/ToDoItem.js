const client = require("../db/conn")
const config = require('../conf/config')
const { ObjectId } = require("mongodb")

class ToDoItem {
    constructor(name, description, deadline) {
        this.name = name
        this.description = description
        this.deadline = new Date(deadline).toUTCString()
        this.done = false
    }

    /**
     * CRUD Operations
     */

    /**
     * Save ToDoItem into database
     */
    async save() {
        try {
            await client.db().collection(config.db.collections.todoItems).insertOne(this)
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
     * @param {*} toDoItem 
     */
    static async updateById(updateObject, id) {
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

module.exports = ToDoItem
