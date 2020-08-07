const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const CourseModel = require("./entities/course_model");
const {
  getCourseSubjectUrls,
  getCourseUrls,
  getCourseInfo,
} = require("./utils");

app.post("/", (req, res) => {
  getCourseSubjectUrls().then(urls => {
    for (let i = 0; i < 100; i++) {
      const subjectUrl = urls[i];
      const courseUrls = await getCourseUrls(subjectUrl);
      courseUrls.forEach(async (courseUrl) => {
        const course = await getCourseInfo(courseUrl);
        CourseModel.insertCourse(course);
      });   
    }
    res.json({msg :"completed webscraping"})
  }).catch(err => {
    res.status(500).json({err : err.code});
  }) 
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
