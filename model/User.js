const config = require("../conf/config")
const dbClient = require("../db/conn")
// User Model 
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

    
}

module.exports = { User, UserDAO }
