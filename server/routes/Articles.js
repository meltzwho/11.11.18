const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db = require('../../db/index');

router.get('/', (req, res) => {
  // get all or single article 
  let sql = req.query.idArticle 
    ? 'SELECT * FROM articles WHERE idArticle = ? ORDER BY idArticle DESC' 
    : 'SELECT * FROM articles ORDER BY idArticle DESC';
  
  
  db.all(sql, req.query.idArticle, (err, rows) => {
    
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      
      if (rows.length === 0) {
        res.sendStatus(404);
      }
      
      // async laziness
      let count = 0;
      let articles = [];

      for (let row of rows) {
        //
        fs.readFile(path.join(__dirname, `../articles/${row.idArticle}.txt`), 'utf8', (err, data) => {
          
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            // -_-_- is title body delimiter
            let articleTitleAndBody = data.split('-_-_-');
            // ms -> dateTime
            let date = new Date(Number(row.timeCreated));
            // count each async file read
            count++;
            
            // add each article to articles[idArticle]
            // maintain chronological ordering
            articles[row.idArticle] = {
              title: articleTitleAndBody[0], 
              body: articleTitleAndBody[1], 
              idArticle: row.idArticle, 
              timeCreated: date.toString()};
            
            // send response after all files read
            if (count === rows.length) {
              res.send(articles);
            }
          
          }
        
        });
      
      }
    
    }
  
  });

});


router.post('/', (req, res) => {

  let sql = 'INSERT INTO Articles(timeCreated) VALUES(?)';
  
  db.run(sql, Date.now(), function(err) {
    
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      // this = sqlite this object
      // write to idArticle.txt with title-body delimited by -_-_-
      fs.writeFile(path.join(__dirname, `../articles/${this.lastID}.txt`), 
        `${req.body.title}-_-_-${req.body.body}`, 'utf8', (err) => {
          
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        
        });
    
    }
  
  });

});


router.put('/', (req, res) => {

  // same as post but put =P

  fs.writeFile(path.join(__dirname, `../articles/${req.body.idArticle}.txt`), 
    `${req.body.title}-_-_-${req.body.body}`, 'utf8', (err) => {

      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }

    });

});



router.delete('/', (req, res) => {

  let sql = 'DELETE FROM Articles WHERE idArticle = ?';

  db.run(sql, req.body.idArticle, (err) => {
    
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {  
      // delete article from filesystem 
      fs.unlink(path.join(__dirname, `../articles/${req.body.idArticle}.txt`), (err) => {
        
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      
      });
    }
  
  });

});

module.exports = router;