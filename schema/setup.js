const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../dev.sqlite3');

const usersSql = fs.readFileSync('./users.sql').toString();

db.serialize(() => {

    db.run(usersSql);
});

db.close();