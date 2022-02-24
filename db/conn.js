const { MongoClient } = require('mongodb')
const config = require('../conf/config')

class Database {
    constructor() {
        this.client = new MongoClient(config.db.url)
    }

    async connect() {
        try {
            await this.client.connect()
            console.log("Database connected")
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    getDb() {
        try {
            return this.client.db(config.db.name)
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}

const database = new Database()

module.exports = database
