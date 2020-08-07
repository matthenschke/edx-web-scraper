const sqlite3 = require("sqlite3").verbose();
const path = require("path");
class DB {
  constructor() {
    if (!DB.instance) {
      this.db = new sqlite3.Database(
        path.join(__dirname, "../db/edx.db"),
        (err) => {
          if (err) {
            console.log(err.message);
          }
          console.log("connected");
        }
      );
      DB.instance = this;
    }
    return DB.instance;
  }

  run(sql, params = []) {
    this.db.run(sql, params, function (err) {
      if (err) {
        console.log("error running " + sql);
        console.log(err);
        throw err;
      }
      console.log("query completed");
    });
  }

  all(sql, params = []) {
    let results;
    this.db.all(sql, params, function (err, rows) {
      if (err) {
        console.log("failed query on " + sql);
        console.log(err);
        throw err;
      }
      return rows;
    });
    return results;
  }

  close() {
    this.db.close();
  }
}

const instance = new DB();
Object.freeze(instance);
module.exports = instance;
