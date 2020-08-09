const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
require("dotenv").config();

const courseModel = require("./entities/course_model");
const webscraper = require("./entities/webscraper");

app.post("/", async (req, res) => {
  webscraper
    .getCourseSubjectUrls()
    .then(async (subjectUrls) => {
      subjectUrls.forEach(async (url) => {
        if (url.startsWith("/learn")) {
          const courseUrls = await webscraper.getCourseUrls(url);
          if (courseUrls) {
            courseUrls.forEach(async (courseUrl) => {
              const course = await webscraper.getCourseInfo(courseUrl);
              courseModel.insertCourse(course);
            });
          }
        }
      });
      res.json({ msg: "webscraping underway!" });
    })
    .catch((err) => {
      res.status(500).json({ err: err.code });
    });
});

app.get("/", (req, res) => {
  let results = [];
  courseModel
    .getCourses()
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
