const config = require("../conf/config")
const dbClient = require("../db/conn")
// User Model 

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
    getInstance() {
        if (!UserDAO.instance) {
            UserDAO.instance = new UserDAO
        }
        return UserDAO.instance
    }
    // get users collection
    getCollection() {
        return dbClient.getDb().getCollection(config.db.collections.users)
    }

}