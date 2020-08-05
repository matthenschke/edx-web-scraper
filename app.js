const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const webscraper = require("./entities/webscraper"); // entities
const { getCourseSubjects } = require("./utils");

// routes

// main route to get each and every course and insert into sqlite table
app.post("/", getCourseSubjects);

app.listen(PORT, () => {
  console.log(`We are a go at port:${PORT}`);
});
