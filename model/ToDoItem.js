const client = require("../db/conn")
const config = require('../conf/config')
const { ObjectId } = require("mongodb")

class ToDoItem {
    constructor(name, description, deadline) {
        this.name = name
        this.description = description
        this.deadline = deadline
        this.done = false
    }

    /**
     * CRUD Model Operations
     */


    /**
     * Save ToDoItem into database
     */
    async save() {
        try {
            await client.db().collection(config.db.collections.todoItems).insertOne({
                name: this.name,
                description: this.description,
                deadline: this.deadline,
                description: this.description
            })
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Retrieve All ToDoItem from database 
     * @returns ToDoItem Array
     */
    static async getProducts() {
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
    async getProductById(id) {
        try {
            const product = await client.db()
                .collection(config.db.collections.todoItems).findOne({ __id: ObjectId(id) })
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
    async removeById(id) {
        try {
            await client.db().collection(config.db.collections.todoItems).deleteOne({ _id: Object(id) })
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    /**
     * Update ToDo item with the IDA into the database
     * @param {*} toDoItem 
     */
    async updateById(toDoItem) {
        try {
            await client.db().collection(config.db.collections.todoItems)
                .replaceOne({ _id: ObjectId(toDoItem.id) }, toDoItem)
        } catch (error) {
            console.error(error)
            throw error
        }
    }


}

module.exports = ToDoItem
