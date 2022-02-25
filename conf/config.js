const config = {
    "server-port": 5000,
    db: {
        name: "todo-app",
        url: "mongodb://localhost:27017",
        collections: {
            users: "users",
            todoItems: "todo-items",
        }
    }
}

module.exports = config