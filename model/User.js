const config = require("../conf/config")
const dbClient = require("../db/conn")
const { ObjectId } = require("mongodb")

class ValidationError extends Error { }

class User {
    // properties: username, email, password
    constructor(username, email, password) {
        this.username = username
        this.email = email
        this.password = password
    }

    // Validations:
    // username: needs to have at least 4 characters
    // email: needs to be a valid email
    // password: needs to have from 6-8 characters

    // Parsing method from JSON object
}

class UserDAO {
    // Public field: ensure that the field instance wil exist only once per UserDAO class
    static instance

    constructor() { }
    // get instance of UserDAO
    static getInstance() {
        if (!UserDAO.instance) {
            UserDAO.instance = new UserDAO()
        }
        return UserDAO.instance
    }
    // get users collection
    getCollection() {
        return dbClient.getDb().collection(config.db.collections.users)
    }

    // ----- CRUD Operations ----- //
    // getAll will be only used by tests
    async getAll() {
        try {
            return await this.getCollection().find().toArray() || []
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    /**
     * Register user to database
     * @param {*} user 
     */
    async insert(user) {
        try {
            const response = await this.getCollection().insertOne(user)
            if (!response) {
                throw new Error("Invalid result while registering user.")
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    /**
     * retrieve User object from database.
     * @param {*} id - id string of wanted user.
     * @returns User with the given id parameter.
     */
    async getOneById(id) {
        try {
            const response = await this.getCollection()
                .findOne({ _id: ObjectId(id) }, { projection: { password: 0, email: 0 } })
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    /**
     *  Delete User with the given id from database. 
     * @param {*} id - id string of User.
     * @returns - deleted User count.
     */
    async removeOneById(id) {
        try {
            const response = await this.getCollection().deleteOne({ _id: ObjectId(id) })

            if (!response || response.deletedCount < 1) {
                throw new Error("Invalid result while removing User.")
            }
            return (response.deletedCount)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    /**
     * Update User properties.
     * @param {*} json requisition body JSON.
     * @returns - number of documments modified. 
     */
    async updateOne(json) {
        const id = json.id
        const updateObject = {}
        updateObject.username = json.username
        updateObject.email = json.email
        updateObject.password = json.password

        try {
            const response = await this.getCollection()
                .updateOne({ _id: ObjectId(id) }, { $set: updateObject })
            if (!response) {
                throw new Error("Invalid result while updating User.")
            }
            return (response.modifiedCount)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

module.exports = { User, UserDAO }
