const express = require('express')
const config = require('./conf/config')

const app = express()

const client = require('./db/conn')

app.use(express.json())

app.listen(config['server-port'])
