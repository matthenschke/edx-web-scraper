const webscraper = require("./entities/webscraper");
require("dotenv").config();

// util functions for our endpoints
module.exports = {
  getCourseSubjectUrls: async () => {
    const $ = await webscraper.scrape(`${process.env.BASE_URL}/sitemap`);
    return $(".multi-col-list")
      .first()
      .find(".views-row")
      .toArray()
      .map(function (el) {
        return $(el).find("a").attr("href");
      });
  },
  getCourseUrls: async (url) => {
    try {
      const $ = await webscraper.scrape(process.env.BASE_URL + url);
      return $(".discovery-card")
        .toArray()
        .map(function (el) {
          return $(el).find(".discovery-card-link").attr("href");
        });
    } catch (err) {
      return [];
    }
  },
  getCourseInfo: async (url) => {
    const courseAttrs = new Set(["price", "length", "language"]);
    try {
      const $ = await webscraper.scrape(process.env.BASE_URL + url);
      let courseInfo = {};
      $(".updated-sidebar ul li").each(function (i, el) {
        let line = $(el).text().split(":");
        let key = line[0][0].toLowerCase() + line[0].slice(1);
        let value = line[1];
        if (courseAttrs.has(key)) {
          if (key === "length" && value.includes("Weeks")) {
            courseInfo[key] = Number(value.split(" ")[0]) * 168;
          } else if (key === "price") {
            if (value.startsWith("$")) {
              courseInfo[key] = Number(value.substring(1).split(" ")[0]);
              courseInfo["cert_price"] = null;
            } else {
              courseInfo[key] = value.substring(0, 4);
              let certificateStr = value.substring(4);
              if (certificateStr.startsWith("Add")) {
                let startIdx = certificateStr.indexOf("$");
                courseInfo["cert_price"] = Number(
                  certificateStr.substring(startIdx + 1).split(" ")[0]
                );
              }
            }
          } else {
            if (key === "language" && courseInfo[key] === "English")
              courseInfo[key] = value;
          }
        }
      });
      // get session
      let sessionStr = $(".enroll-btn small").text();
      if (sessionStr) {
        if (sessionStr == "") courseInfo["session"] = null;
        else {
          let sessionStrParts = sessionStr.split(" ");
          let date;
          sessionStrParts.shift();
          if (sessionStrParts instanceof Array)
            date = sessionStrParts.join(" ");
          else date = sessionStrParts;
          courseInfo["session"] = date;
        }
      }

      // overview
      const overviewStr = $(".course-intro-lead-in p").text();
      if (overviewStr) courseInfo["overview"] = overviewStr;

      // instructors
      const instructors = [];
      $(".instructor-list .instructor").each(function (i, el) {
        instructors.push($(el).find(".name").text());
      });
      courseInfo["instructors"] = instructors;
      return courseInfo;
    } catch (err) {
      return {};
    }
  },
};
