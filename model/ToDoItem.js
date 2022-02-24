const dbClient = require("../db/conn")
const { ObjectId } = require("mongodb")
const config = require("../conf/config")

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
    static isValid(json) {
        if (json.name) {
            if (json.name.trim().length > 1) return true
        }
        return false
    }

    static fromJSON(json) {
        if (!(ToDoItem.isValid(json))) {
            throw new ValidationError("Name property is required.")
        }

        const toDoItem = new ToDoItem(json.name)
        if ("description" in json) {
            toDoItem.description = json.description
        }

        if ("deadline" in json) {
            const dateUTCString = new Date(json.date).toUTCString() || ""
            toDoItem.deadline = dateUTCString
        }

        return toDoItem
    }

}

class ToDoItemDAO {
    static instance

    constructor() { }

    getCollection() {
        return dbClient.getDb().collection(config.db.collections.todoItems)
    }

    static getInstance() {
        if (!ToDoItemDAO.instance) {
            ToDoItemDAO.instance = new ToDoItemDAO()
        }
        return ToDoItemDAO.instance
    }

    /*---- CRUD Operations ----*/

    async insert(toDoItem) {
        try {
            const response = await this.getCollection().insertOne(toDoItem)

            if (!response || response.insertedCount < 1) {
                throw new Error("Invalid result while inserting item.")
            }
            return response.insertedCount
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getAll() {
        try {
            return await this.getCollection().find().toArray() || []
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getOneById(id) {
        try {
            const response = await this.getCollection().findOne({ _id: ObjectId(id) })
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async removeOneById(id) {
        try {
            const response = await this.getCollection().deleteOne({ _id: ObjectId(id) })
            if (!response || response.deletedCount < 1) {
                throw new Error("Invalid result while removing item.")
            }
            return response.deletedCount
        } catch (error) {
            console.log(error)
            throw error
        }

    }

    async updateOneById(json) {
        const id = json.id
        const updateObject = {}

        if (!id) {
            throw new ValidationError("Can't update an item without the Id.")
        }
        if (json.name) {
            if (json.name.trim().length < 1) {
                throw new ValidationError("Invalid value for name property.")
            }
            updateObject.name = json.name
        }

        if ("description" in json) updateObject.description = json.description 
        if ("deadline" in json) updateObject.deadline = new Date(json.deadline).toUTCString()
        if (json.done) updateObject.done = json.done


        try {
            const response = await this.getCollection()
                .updateOne({ _id: ObjectId(id) }, { $set: updateObject })

            if (!response) {
                throw new Error("Invalid result while updatin item.")
            }
            return response.modifiedCount
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

module.exports = { ToDoItem, ToDoItemDAO, ValidationError }
