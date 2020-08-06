const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const webscraper = require("./entities/webscraper"); // entities
const {
  getCourseSubjectUrls,
  getCourseUrls,
  getCourseInfo,
} = require("./utils");

async function main() {
  const subjectUrls = await getCourseSubjectUrls();
  for (let i = 0; i < 10; i++) {
    const subjectUrl = subjectUrls[i];
    const courseUrls = await getCourseUrls(subjectUrl);
    for (let j = 0; j < 10; j++) {
      const courseUrl = courseUrls[j];
      const courseInfo = getCourseInfo(courseUrl);
    }
  }
  // subjectUrls.forEach(async (url) => {
  //   courseUrls.forEach((courseUrl) => {
  //     const courseInfo = getCourseInfo(courseUrl);
  //   });
  // });
}

main();

// main route to get each and every course and insert into sqlite table
// app.post("/", async (req, res) => {
//   const subjectUrls = await getCourseSubjectUrls();
//   subjectUrls.forEach(async (url) => {
//     const courseUrls = await getCourseUrls(url);
//     courseUrls.forEach((courseUrl) => {
//       const courseInfo = getCourseInfo(courseUrl);
//     });
//   });
//   res.json({ msg: "webscraping is complete!" });
// });

// app.listen(PORT, () => {
//   console.log(`We are a go at port:${PORT}`);
// });
