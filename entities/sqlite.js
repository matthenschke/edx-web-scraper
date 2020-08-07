const sqlite3 = require("sqlite3").verbose();
const path = require("path");
class SQLite {
  constructor() {
    if (!SQLite.instance) {
      this.db = new sqlite3.Database(
        path.join(__dirname, "../db/edx.db"),
        (err) => {
          if (err) {
            console.log(err.message);
          }
          console.log("connected");
        }
      );
      SQLite.instance = this;
    }
    return SQLite.instance;
  }

  insert(course) {
    // check if course is valid if it has the 7 required keys
    if (Object.keys(course).length !== 7) return;
    let sql =
      "INSERT INTO Courses (overview, length, price, cert_price, language, session, instructors) VALUES (?, ?, ?, ?, ?, ?, ?)";
    this.db.run(
      sql,
      [
        course.overview,
        course.length,
        course.price,
        course.cert_price,
        course.language,
        course.session,
        course.instructors,
      ],
      (err) => {
        if (err) throw err;
        console.log("insert success");
      }
    );
  }

  close() {
    this.db.close();
  }
}

const instance = new SQLite();
Object.freeze(instance);
module.exports = instance;
