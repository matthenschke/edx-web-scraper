// web scraper class to get edx course data
const {
  getCourseTitle,
  getSideBarAttrs,
  getOverview,
  getSession,
  getInstructors,
} = require("../util/webscraper");
class WebScraper {
  constructor() {
    if (!WebScraper.instance) {
      this.http = require("./http");
      this.cheerio = require("./cheerio");
      WebScraper.instance = this;
    }
    return WebScraper.instance;
  }
  async getCourseSubjectUrls() {
    try {
      const $ = await this.cheerio.load(`${process.env.BASE_URL}/sitemap`);
      return $(".multi-col-list")
        .first()
        .find(".views-row")
        .toArray()
        .map(function (el) {
          return $(el).find("a").attr("href");
        })
        .slice(0, 100);
    } catch (err) {
      return [];
    }
  }
  async getCourseUrls(subjectUrl) {
    try {
      const $ = await this.cheerio.load(process.env.BASE_URL + subjectUrl);
      return [
        ...$(".discovery-card")
          .toArray()
          .filter(function (el) {
            return $(el).find(".card-type span").text() === "Course";
          })
          .map(function (el) {
            return $(el).find(".discovery-card-link").attr("href");
          }),
      ];
    } catch (err) {
      return [];
    }
  }
  async getCourseInfo(courseUrl) {
    try {
      const $ = await this.cheerio.load(process.env.BASE_URL + courseUrl);
      let courseInfo = {};
      getCourseTitle($, courseInfo);
      getSideBarAttrs($, courseInfo);
      getSession($, courseInfo);
      getOverview($, courseInfo);
      getInstructors($, courseInfo);
      return courseInfo;
    } catch (err) {
      return {};
    }
  }
}
const instance = new WebScraper();
Object.freeze(instance);
module.exports = instance;
