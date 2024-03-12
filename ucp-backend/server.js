// Modules Imports
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const dotEnv = require('dotenv').config()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

// Modules Declarations
const expressApp = express()

expressApp.use(express.urlencoded({extended: true}))
expressApp.use(cors())
expressApp.use(express.json())

// Middleware az access token check
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)

      req.user = user
      next()
  });
}

// MYSQL Pool create with connection attributes
const mysqlPool = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DBHOST,
  user            : process.env.DBUSER,
  password        : process.env.DBPASS,
  database        : process.env.DBNAME,
  timezone        : 'UTC'
})

mysqlPool.getConnection((err, conn) => {
  if (err) {
    return console.error(err)
  }

  console.log('MYSQL: Sikeres adatbázis csatlakozás!')
})

// GET Endpoints
expressApp.get('/API/news', (req, res) => {
  mysqlPool.query('SELECT * FROM news', (err, results) => {
    if (err) {
      return res.send([500, err.message])
    }

    res.send([200, results])
  })
})

// POST Endpoints
expressApp.post('/API/loginUser', (req, res) => {
  const requestData = req.body

  mysqlPool.query(`SELECT * FROM accounts WHERE BINARY username = '${ requestData.username }'`, async (err, results) => {
    if (err) {
      return res.send([500, err.message])
    }

    if (results == 0) {
      return res.send([401, 'Ilyen felhasználó nincsen a rendszerben!'])
    }

    const verifyHashedPassword = await argon2.verify(results[0].password, requestData.password)

    if (!verifyHashedPassword) {
      return res.send([401, 'Helytelen jelszót adtál meg!'])
    }

    const userObject = {
      accID: results[0].accountID,
      username: results[0].username,
      email: results[0].email,
      role: results[0].role,
    }
    userObject.refreshToken = jwt.sign(userObject, process.env.JWT_KEY)

    mysqlPool.query(`UPDATE accounts SET refreshToken = '${ userObject.refreshToken }' WHERE username = '${ requestData.username }'`, (err) => {
      if (err) {
        return res.send([500, err.message])
      }

      res.send([200, 'Sikeres bejelentkezés!', userObject])
    })
  })
})

expressApp.post('/API/profile', authenticateToken, (req, res) => {
  const requestData = req.body

  mysqlPool.query(`SELECT * FROM accounts WHERE accountID = ${ requestData.ID }`, (err, results) => {
    if (err) {
      return res.send([500, err.message])
    }

    res.send([200, results])
  })
})

expressApp.post('/API/registerUser', (req, res) => {
  const requestData = req.body

  mysqlPool.query(`SELECT username FROM accounts WHERE username = '${ requestData.username }'`, async (err, results) => {
    if (err) {
      return res.send([500, err.message])
    }

    if (results != 0) {
      return res.send([401, 'Ilyen felhasználó már van!'])
    }

    mysqlPool.query(`SELECT email FROM accounts WHERE email = '${ requestData.email }'`, async (err, results) => {
      if (results != 0) {
        return res.send([401, 'Ilyen e-mail címmel rendelkező felhasználó már van!'])
      }

      const hashedPassword = await argon2.hash(requestData.password)

      mysqlPool.query(`INSERT INTO accounts (username, password, email) VALUES ('${ requestData.username }', '${ hashedPassword }', '${ requestData.email }')`, (err) => {
        if (err) {
          return res.send([500, err.message])
        }

        res.send([200, 'Sikeres regisztráció!'])
      })
    })
  })
})

// Backend listening on a specify port
expressApp.listen(process.env.SERVER_PORT, () => {
  console.log(`API: A backend szerver sikeresen elindult! http://localhost:${process.env.SERVER_PORT}`)
})