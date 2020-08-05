const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const webscraper = require("./entities/webscraper"); // entities
const {
  getCourseSubjectUrls,
  getCourseUrls,
  getCourseInfo,
} = require("./utils");

// routes

// main route to get each and every course and insert into sqlite table
app.post("/", async (req, res) => {
  const subjectUrls = await getCourseSubjectUrls();
  subjectUrls.forEach(async (url) => {
    const courseUrls = await getCourseUrls(url);
    courseUrls.forEach((courseUrl) => {
      const courseInfo = getCourseInfo(courseUrl);
    });
  });
});

app.listen(PORT, () => {
  console.log(`We are a go at port:${PORT}`);
});
