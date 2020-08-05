const webscraper = require("./entities/webscraper");
require("dotenv").config();

module.exports = {
  getCourseSubjects: async (req, res, next) => {
    const $ = await webscraper.scrape(process.env.URL);
    res.json($.html());
  },
};
