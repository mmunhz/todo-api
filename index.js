const express = require('express')
const config = require('./conf/config')
const database = require('./db/conn')
const toDoItemRoutes = require('./routes/todoItemRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(express.json())

// User routes
app.use('/users', userRoutes)
// ToDo Items routes
app.use('/todos', toDoItemRoutes)

app.listen(config['server-port'], async () => {
   await database.connect()
   console.log(`Service running on ${config['server-port']}`)
})
