const router = require('express').Router();
const db = require('../../db/index');


router.get('/', (req, res) => {
  // client sends 'null' need undefined for conditional and executing sql
  if (req.query.idArticle === 'null') {
    req.query.idArticle = undefined;
  }
  
  // get all users or only users for shared article
  let sql = req.query.idArticle
    ? 'SELECT * FROM Views INNER JOIN Users ON Views.idUser = Users.idUser WHERE idArticle = ?'
    : 'SELECT * FROM Users';


  db.all(sql, req.query.idArticle, (err, rows) => {
    
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.send(rows);
    }
    
  });

});

module.exports = router;