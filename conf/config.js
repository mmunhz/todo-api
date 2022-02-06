const config = {
    "server-port": 5000,
    db: {
        name: "todo-app",
        url: "mongodb://localhost:27017",
        collections: {
            toDoItem: "todo-item"
        }
    }
}

module.exports = config