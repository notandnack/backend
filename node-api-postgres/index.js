const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 4000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  app.get('/employee', db.getUsers)
  app.get('/employee/:employeeID', db.getUserById)
  app.post('/employee', db.createUser)
  app.put('/employee/:employeeID', db.updateUser)
  app.delete('/employee/:employeeID', db.deleteUser)
  
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
