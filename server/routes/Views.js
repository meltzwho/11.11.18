const router = require('express').Router();
const db = require('../../db/index');

router.put('/', (req, res) => {
  // update user viewStatus
  let sql = `UPDATE Views SET viewStatus = "seen" WHERE viewInfo = ?`;

  db.run(sql, req.body.viewInfo, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });

});

module.exports = router;