const router = require('express').Router();
const db = require('../../db/index');

const nm = require('nodemailer');

let transporter = nm.createTransport({
  service: 'gmail',
  auth: {
    user: 'malbolge1239@gmail.com',
    pass: 'testtest123!'
  }
});


router.post('/', (req, res) => {
  
  let idArticle = req.body.idArticle;


  db.all('SELECT * FROM Users', (err, rows) => {
    
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      
      // email each user
      for (let row of rows) {
        // set up email with unique links per user
        let idUser = row.idUser;
        let URL = `http://localhost:3000/shared?idArticle=${idArticle}&idUser=${idUser}`;
        let email = `${row.email}`;
        let mailOptions = {
          from: 'malbolge1239@gmail.com',
          to: email,
          subject: 'New article',
          html: `<a href=${URL}>Check out article</a>`  
        };
        
        //SEND IT
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error(err);
          } else {
            console.log(info);
          }
        });


        // track viewStatus
        // init to unseen
        db.run(`INSERT INTO Views VALUES(?,?,?,?)`, [`${idUser}-${idArticle}`, idArticle, idUser, 'unseen'], (err) => {
          if (err) {
            console.error(err);
          }
        });

      }

      res.sendStatus(200);
    }
  
  });
  
});

module.exports = router;