// Modules Imports
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const dotEnv = require('dotenv').config();
const argon2 = require('argon2');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');


// Modules Declarations
const expressApp = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // A képfájlok mentésének mappája
  },
  filename: function (req, file, cb) {
    // A képfájl nevének generálása (pl. egyedi id vagy eredeti fájlnév)
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

// Middleware
const upload = multer({ storage: storage });

expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cors());
expressApp.use(express.json());
expressApp.use('/uploads', express.static('uploads'))

// MYSQL Pool create with connection attributes
const mysqlPool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  timezone: 'UTC'
});

// Email settings
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth:{
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
  }
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
  mysqlPool.query('SELECT * FROM news ORDER BY date DESC', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

expressApp.get('/API/users', (req, res) => {
  mysqlPool.query('SELECT * FROM accounts WHERE role NOT LIKE "admin" ORDER BY username', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

expressApp.get('/API/getUserData/:ID', async (req, res) => {
  const requestedUserID = req.params.ID;

  try {
    const userObject = await getUserProfileData(requestedUserID);
    return res.status(200).json({ message: 'Sikeres adat lekérés!', data: userObject });
  } catch (error) {
    console.error('Error getting data from user:', error);
    return res.status(500).json({ error: 'Rendszer hiba történt!' });
  }
});

// POST Endpoints
expressApp.post('/API/news/:ID', (req, res) => {
  const updateBody = req.body;
  const updateDate = req.params.ID;

  updateBody.context = updateBody.context.replaceAll(/\'/g, "\\'")

  mysqlPool.query(`UPDATE news SET title = '${updateBody.title}', date = '${updateBody.date}', context = '${updateBody.context}' WHERE newsID = '${updateDate}'`, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

expressApp.post('/API/news_delete/:ID', (req, res) => {
  const deleteDate = req.params.ID;

  mysqlPool.query(`DELETE FROM news WHERE newsID = '${deleteDate}'`, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

expressApp.post('/API/news_create', (req, res) => {
  const requestData = req.body

  mysqlPool.query(`INSERT INTO news(title, date, context) VALUES ('${requestData.title}', '${requestData.date}', '${requestData.context}')`, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

expressApp.post('/API/loginUser', async (req, res) => {
  const requestData = req.body;

  try {
    const accountResults = await getUserAccount(requestData.username);
    if (accountResults.length === 0)
      return res.status(401).json({ message: 'Nincs ilyen felhasználó a rendszerben!' });

    const verifyHashedPassword = await argon2.verify(accountResults[0].password, requestData.password);
    if (!verifyHashedPassword)
      return res.status(401).json({ message: 'Érvénytelen jelszó!' });

      mysqlPool.query(`UPDATE accounts SET updatedAt = NOW() WHERE accID = '${accountResults[0].accID}'`, async (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err.message });
        }

        const userObject = await getUserProfileData(accountResults[0].accID);
        return res.status(200).json({ message: 'Sikeres belépés!', data: userObject });
      });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ error: 'Rendszer hiba történt!' });
  }
});

expressApp.post('/API/registerUser', async (req, res) => {
  const requestData = req.body;

  try {
    const existingUsername = await checkExistingUser('username', requestData.username);
    if (existingUsername)
      return res.status(401).json({ message: 'Ilyen felhasználó már van!' });

    const existingEmail = await checkExistingUser('email', requestData.email);
    if (existingEmail)
      return res.status(401).json({ message: 'Ilyen felhasználü már van ezzel az e-mail címmel!' });

    const hashedPassword = await argon2.hash(requestData.password);
    await registerNewUser(requestData.username, hashedPassword, requestData.email);
    return res.status(200).json({ message: 'Sikeres regisztráció!' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Rendszer hiba történt!' });
  }
});

expressApp.post('/API/user_delete/:ID', (req, res) => {
  const requestedUserID = req.params.ID;

  mysqlPool.query(`DELETE FROM accounts WHERE accID = '${requestedUserID}'`, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

expressApp.post('/API/uploadProfilePicture/:ID', upload.single('file'), (req, res) => {
  const requestedUserID = req.params.ID
  const requestedPrevProfilePic = req.body.prefFile

  if (requestedPrevProfilePic != '') {
    fs.unlink(__dirname + '/uploads/' + requestedPrevProfilePic, (err) => {
      if (err) throw err;
    });  
  }

  mysqlPool.query(`UPDATE accounts SET avatar = '${req.file.filename}' WHERE accID = ${requestedUserID}`, async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({ message: 'Sikeres avatár feltöltés!', data: req.file.filename });
  });
});

expressApp.post('/API/user_profile_delete/:ID/:imageName', (req, res) => {
  const requestedUserID = req.params.ID
  const requestedImageName = req.params.imageName

  mysqlPool.query(`UPDATE accounts SET avatar = '' WHERE accID = ${requestedUserID}`, async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    fs.unlink(__dirname + '/uploads/' + requestedImageName, (err) => {
      if (err) throw err;
      
      return res.status(200).json({ message: 'Sikeresen kitörölted az avatárod!', data: results });
    });
  });
});

expressApp.post('/API/sendEmail/:to', (req, res) =>{
  mysqlPool.query(`SELECT * FROM accounts WHERE email = '${req.params.to}'`, async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length == 0) {
      return res.status(500).json({ message: 'Nincs ilyen e-mail címmel rendelkező felhasználó.' })
    }

    var mailOptions = {
      from: process.env.SMTP_USER,
      to: req.params.to,
      subject: 'Elfelejtett adatok',
      html: `<!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
      
      <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }
      
          body {
            margin: 0;
            padding: 0;
          }
      
          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }
      
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }
      
          p {
            line-height: inherit
          }
      
          .desktop_hide,
          .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
          }
      
          .image_block img+div {
            display: none;
          }
      
          @media (max-width:620px) {
            .desktop_hide table.icons-inner {
              display: inline-block !important;
            }
      
            .icons-inner {
              text-align: center;
            }
      
            .icons-inner td {
              margin: 0 auto;
            }
      
            .mobile_hide {
              display: none;
            }
      
            .row-content {
              width: 100% !important;
            }
      
            .stack .column {
              width: 100%;
              display: block;
            }
      
            .mobile_hide {
              min-height: 0;
              max-height: 0;
              max-width: 0;
              overflow: hidden;
              font-size: 0px;
            }
      
            .desktop_hide,
            .desktop_hide table {
              display: table !important;
              max-height: none !important;
            }
          }
        </style>
      </head>
      
      <body style="background-color: #d9dffa; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #cfd6f4;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div style="max-width: 600px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/animated_header.gif" style="display: block; height: auto; border: 0; width: 100%;" width="600" alt="Card Header with Border and Shadow Animated" title="Card Header with Border and Shadow Animated" height="auto"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/body_background_2.png'); background-position: top center; background-repeat: repeat;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 15px; padding-left: 50px; padding-right: 50px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="paragraph_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#506bec;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:38px;line-height:120%;text-align:left;mso-line-height-alt:45.6px;">
                                        <p style="margin: 0; word-break: break-word;"><strong><span>Elfelejtetted a felhasználóneved?</span></strong></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#40507a;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><span>Felhasználóneved: <strong>${results[0].username}</strong></a></span></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div style="max-width: 600px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/bottom_img.png" style="display: block; height: auto; border: 0; width: 100%;" width="600" alt="Card Bottom with Border and Shadow Image" title="Card Bottom with Border and Shadow Image" height="auto"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-left: 10px; padding-right: 10px; padding-top: 10px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div></div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
      </body>
      
      </html>`
    }

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(400).json({ message: 'Sikertelen email küldés!' });
      }
      
      res.status(200).json({ message: 'Sikeres email küldés!' });
    });
  });
});

// Helper Functions
async function getUserProfileData(accID) {
  return new Promise((resolve, reject) => {
    mysqlPool.query(`SELECT * FROM accounts WHERE accID = '${accID}'`, async (err, accountResults) => {
      if (err || accountResults.length === 0) {
        reject(err);
      } else {
        const charResults = await getUserCharacters(accID);

        const userObject = {
          accountData: {
            accID: accountResults[0].accID,
            username: accountResults[0].username,
            email: accountResults[0].email,
            role: accountResults[0].role,
            avatar: accountResults[0].avatar ?? '',
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

        resolve(userObject);
      }
    });
  });
}

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