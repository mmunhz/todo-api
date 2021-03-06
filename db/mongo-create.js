// Mongoshell script to create an new ToDO! database with minimal test data
db = connect('127.0.0.1:27017/todo-app')

// drop previous data
db.dropDatabase()
// reconnect
db = connect('127.0.0.1:27017/todo-app')

db.createCollection('todo-items')

// minimal test data
db['todo-items'].insertOne({
    "name": "Do some test",
    "description": "Do some test to this application",
    "deadline": new Date(Date.parse("01/01/2019")).toUTCString(),
    "done": false,
})

db['todo-items'].insertOne({
    "name": "Do some test 2",
    "description": "Do some test to this application 2",
    "deadline": new Date(Date.parse("01/01/2019")).toUTCString(),
    "done": false,
})