const { MongoClient } = require('mongodb')
const config = require('../conf/config')

const uri = config.db.url + "/" + config.db.name

const client = new MongoClient(uri)

/**
 * Connect to the database
 */
async function connect() {
    try {
        await client.connect()
        console.log("Connected to the database.")
    } catch (error) {
        console.error("Failed to connect to the database.")
        throw error
    }
}

connect()

module.exports = client 
