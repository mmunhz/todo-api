const express = require('express')
const config = require('./conf/config')
const toDoItemRoutes = require('./routes/todoItemRoutes')

const app = express()

const client = require('./db/conn')

app.use(express.json())

// ToDo Items routes
app.use('/todos', toDoItemRoutes)

app.listen(config['server-port'])
