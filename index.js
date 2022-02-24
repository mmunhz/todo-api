const express = require('express')
const config = require('./conf/config')
const toDoItemRoutes = require('./routes/todoItemRoutes')
const database = require('./db/conn')


const app = express()

app.use(express.json())

// ToDo Items routes
app.use('/todos', toDoItemRoutes)

app.listen(config['server-port'], async () => {
   await database.connect()
   console.log(`Service running on ${config['server-port']}`)
})
