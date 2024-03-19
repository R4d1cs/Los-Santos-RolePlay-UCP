// Modules Imports
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const dotEnv = require('dotenv').config();
const argon2 = require('argon2');

// Modules Declarations
const expressApp = express();

// Middleware
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cors());
expressApp.use(express.json());

// MYSQL Pool create with connection attributes
const mysqlPool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  timezone: 'UTC'
});

// Connection to MySQL
mysqlPool.getConnection((err, conn) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('MySQL connection successful!');
});

// GET Endpoints
expressApp.get('/API/news', (req, res) => {
  mysqlPool.query('SELECT * FROM news', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// POST Endpoints
expressApp.post('/API/loginUser', async (req, res) => {
  const requestData = req.body;

  try {
    const accountResults = await getUserAccount(requestData.username);
    if (accountResults.length === 0)
      return res.status(401).json({ message: 'No such user exists in the system!' });

    const verifyHashedPassword = await argon2.verify(accountResults[0].password, requestData.password);
    if (!verifyHashedPassword)
      return res.status(401).json({ message: 'Incorrect password provided!' });

    const userObject = await getUserProfileData(accountResults[0].accID);
    return res.status(200).json({ message: 'Login successful!', data: userObject });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

expressApp.post('/API/registerUser', async (req, res) => {
  const requestData = req.body;

  try {
    const existingUsername = await checkExistingUser('username', requestData.username);
    if (existingUsername)
      return res.status(401).json({ message: 'User already exists!' });

    const existingEmail = await checkExistingUser('email', requestData.email);
    if (existingEmail)
      return res.status(401).json({ message: 'User with this email already exists!' });

    const hashedPassword = await argon2.hash(requestData.password);
    await registerNewUser(requestData.username, hashedPassword, requestData.email);
    return res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

expressApp.post('/API/getUserProfile', async (req, res) => {
  const requestData = req.body;

  try {
    const accountResults = await getUserAccount(requestData.accID);
    const charResults = await getUserCharacters(accountResults[0].accID);

    const userObject = {
      accountData: {
        accID: accountResults[0].accID,
        username: accountResults[0].username,
        email: accountResults[0].email,
        role: accountResults[0].role,
        updatedAt: accountResults[0].updatedAt,
        createdAt: accountResults[0].createdAt
      },
      charData: charResults.length > 0 ? {
        charID: charResults[0].charID,
        charName: charResults[0].charName,
        gameTime: charResults[0].gameTime,
        cashBalance: charResults[0].cashBalance,
        bankBalance: charResults[0].bankBalance,
        updatedAt: charResults[0].updatedAt
      } : null
    };

    return res.status(200).json({ message: 'Successful profile data retrieval!', data: userObject });
  } catch (error) {
    console.error('Error fetching user profile data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper Functions
async function getUserAccount(username) {
  return new Promise((resolve, reject) => {
    mysqlPool.query(`SELECT * FROM accounts WHERE BINARY username = '${username}'`, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

async function getUserCharacters(accID) {
  return new Promise((resolve, reject) => {
    mysqlPool.query(`SELECT * FROM characters WHERE accID = '${accID}'`, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

async function checkExistingUser(field, value) {
  return new Promise((resolve, reject) => {
    mysqlPool.query(`SELECT ${field} FROM accounts WHERE ${field} = '${value}'`, (err, results) => {
      if (err) reject(err);
      resolve(results.length > 0);
    });
  });
}

async function registerNewUser(username, hashedPassword, email) {
  return new Promise((resolve, reject) => {
    mysqlPool.query(`INSERT INTO accounts (username, password, email) VALUES ('${username}', '${hashedPassword}', '${email}')`, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

// Backend listening on a specific port
const PORT = process.env.SERVER_PORT || 3000;
expressApp.listen(PORT, () => {
  console.log(`API: Backend server successfully started at http://localhost:${PORT}`);
});