const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const CourseModel = require("./entities/course_model");
const {
  getCourseSubjectUrls,
  getCourseUrls,
  getCourseInfo,
} = require("./utils");

app.post("/", async (req, res) => {
  try {
    let subjectUrls = await getCourseSubjectUrls();
    subjectUrls.forEach(async (url) => {
      const courseUrls = await getCourseUrls(url);
      courseUrls.forEach(async (courseUrl) => {
        const course = await getCourseInfo(courseUrl);
        CourseModel.insertCourse(course);
      });
    });
    res.json({ msg: "webscraping underway" });
  } catch (err) {
    res.status(500).json({ err: err.code });
  }
});

app.get("/", (req, res) => {
  let results = [];
  CourseModel.getCourses()
    .then((rows) => {
      rows.forEach((row) => {
        if (!isNaN(parseFloat(row.price))) row.price = parseFloat(row.price);
        row.instructors = row.instructors.split(",");
        results.push(row);
      });
      res.json(results);
    })
    .catch((err) => {
      res.status(500).json({ error: err.code });
    });
});

app.listen(PORT, () => {
  console.log(`We are a go at port:${PORT}`);
});
