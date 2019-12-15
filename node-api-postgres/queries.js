const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employee',
  password: '1234',
  port: 5432,
})
const getUsers = (request, response, next) => {
  pool.query('SELECT * FROM employee ORDER BY "employeeID" ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getUserById = (request, response, next) => {
  const employeeID = parseInt(request.params.employeeID)

  pool.query('SELECT * FROM employee WHERE "employeeID" = $1', [employeeID], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const createUser = (request, response, next) => {
  const { employeeName, employeeTel } = request.body

  pool.query('INSERT INTO employee ("employeeName", "employeeTel") VALUES ($1, $2)', [employeeName, employeeTel], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with employeeName: ${employeeName}`)
  })
}
const updateUser = (request, response, next) => {
  const employeeID = parseInt(request.params.employeeID)
  const { employeeName, employeeTel } = request.body

  pool.query(
    'UPDATE employee SET "employeeName" = $1, "employeeTel" = $2 WHERE "employeeID" = $3',
    [employeeName, employeeTel, employeeID],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with employeeID: ${employeeID}`)
    }
  )
}
const deleteUser = (request, response, next) => {
  const employeeID = parseInt(request.params.employeeID)

  pool.query('DELETE FROM employee WHERE "employeeID" = $1', [employeeID], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with employeeID: ${employeeID}`)
  })
}
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}