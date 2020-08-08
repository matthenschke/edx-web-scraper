class CourseModel {
  constructor() {
    this.db = require("./db");
  }

  insertCourse(course) {
    // check if course is valid if it has the 7 required keys
    if (Object.keys(course).length !== 7) {
      return;
    }

    let sql =
      "INSERT INTO Courses (overview, length, price, cert_price, language, session, instructors) VALUES (?, ?, ?, ?, ?, ?, ?)";
    this.db.run(sql, [
      course.overview,
      course.length,
      course.price,
      course.cert_price,
      course.language,
      course.session,
      course.instructors,
    ]);
  }

  async getCourses() {
    let sql = "SELECT * FROM Courses";
    return this.db.all(sql);
  }
}

module.exports = new CourseModel();
