// Modules Imports
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const dotEnv = require('dotenv').config()
const argon2 = require('argon2')

// Modules Declarations
const expressApp = express()

expressApp.use(express.urlencoded({extended: true}))
expressApp.use(cors())
expressApp.use(express.json())

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

  mysqlPool.query(`SELECT * FROM accounts WHERE BINARY username = '${ requestData.username }'`, async (err, accountResults) => {
    if (err) {
      return res.send([500, err.message])
    }

    if (accountResults == 0) {
      return res.send([401, 'Ilyen felhasználó nincsen a rendszerben!'])
    }

    const verifyHashedPassword = await argon2.verify(accountResults[0].password, requestData.password)

    if (!verifyHashedPassword) {
      return res.send([401, 'Helytelen jelszót adtál meg!'])
    }

    mysqlPool.query(`SELECT * FROM characters WHERE accID = '${ accountResults[0].accID }'`, async (err, charResults) => {
      if (charResults == 0) {
        const userObject = {
          accountData: {
            accID: accountResults[0].accID,
            username: accountResults[0].username,
            email: accountResults[0].email,
            role: accountResults[0].role,
            updatedAt: accountResults[0].updatedAt,
            createdAt: accountResults[0].createdAt
          }
        }
  
        return res.send([200, 'Sikeres bejelentkezés!', userObject])
      }

      const userObject = {
        accountData: {
          accID: accountResults[0].accID,
          username: accountResults[0].username,
          email: accountResults[0].email,
          role: accountResults[0].role,
          updatedAt: accountResults[0].updatedAt,
          createdAt: accountResults[0].createdAt
        },
        charData: {
          charID: charResults[0].charID,
          charName: charResults[0].charName,
          gameTime: charResults[0].gameTime,
          cashBalance: charResults[0].cashBalance,
          bankBalance: charResults[0].bankBalance,
          updatedAt: charResults[0].updatedAt
        }
      }

      res.send([200, 'Sikeres bejelentkezés!', userObject])
    })
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