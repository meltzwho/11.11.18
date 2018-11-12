const sqlite3 = require('sqlite3').verbose();

module.exports = new sqlite3.Database('./db/noom.sqlite', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to database');
  }
});
