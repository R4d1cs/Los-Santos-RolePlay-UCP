// Modules Imports
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const dotEnv = require('dotenv').config()

// Modules Declarations
const expressApp = express()

expressApp.use(express.urlencoded({extended: true}))
expressApp.use(cors())
expressApp.use(express.json())

const mysqlPool = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DBHOST,
  user            : process.env.DBUSER,
  password        : process.env.DBPASS,
  database        : process.env.DBNAME,
  timezone        : 'UTC'
})

expressApp.get('/API/news', (req, res) => {
  mysqlPool.query('SELECT * FROM news', (err, results) => {
    if (err) {
      return res.status(500).send(err.message)
    }

    res.status(200).send(results)
  })
})

expressApp.post('/API/registerUser', (req, res) => {
  const requestData = req.body

  mysqlPool.query(`SELECT username FROM accounts WHERE username = '${ requestData.username }'`, (err, results) => {
    if (err) {
      return res.send([500, err.message])
    }

    if (results != 0) {
      return res.send([401, 'Ilyen felhasználó már van!'])
    }

    mysqlPool.query(`INSERT INTO accounts (username, password, email) VALUES ('${ requestData.username }', '${ requestData.password }', '${ requestData.email }')`, (err, results) => {
      if (err) {
        return res.send([500, err.message])
      }

      res.send([200, 'Sikeres regisztráció!'])
    })
  })
})

expressApp.listen(process.env.SERVER_PORT, () => {
  console.log(`A backend szerver sikeresen elindult! http://localhost:${process.env.SERVER_PORT}`)
})