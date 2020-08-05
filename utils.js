const webscraper = require("./entities/webscraper");
require("dotenv").config();

// middleware functions for our endpoints
module.exports = {
  getCourseSubjectUrls: async () => {
    const $ = await webscraper.scrape(`${process.env.URL}/sitemap`);
    return $(".multi-col-list")
      .first()
      .find(".views-row")
      .toArray()
      .map(function (x) {
        return $(x).find("a").attr("href");
      });

    // get the course subjects
  },
  getCourseUrls: async (url) => {
    try {
      const $ = await webscraper.scrape(process.env.URL + url);
      return $(".discovery-card")
        .toArray()
        .map(function (x) {
          return $(x).find(".discovery-card-link").attr("href");
        });
    } catch (err) {
      return [];
    }
  },
  getCourseInfo: async () => {},
};
