const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const webscraper = require("./entities/webscraper"); // entities
const { getCourseSubjectUrls, getCourseUrls } = require("./utils");

// routes

// main route to get each and every course and insert into sqlite table
app.post("/", async (req, res) => {
  try {
    const subjectUrls = await getCourseSubjectUrls();
    subjectUrls.forEach(async (url) => {
      try {
        const courseUrls = await getCourseUrls(url);
        console.table(courseUrls);
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`We are a go at port:${PORT}`);
});
