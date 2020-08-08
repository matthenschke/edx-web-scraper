// web scraper class to get edx course data
const {
  setCourseTitle,
  setSideBarAttrs,
  setOverview,
  setSession,
  setInstructors,
} = require("../utils");
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
    const $ = await this.cheerio.load(`${process.env.BASE_URL}/sitemap`);
    return $(".multi-col-list")
      .first()
      .find(".views-row")
      .toArray()
      .map(function (el) {
        return $(el).find("a").attr("href");
      })
      .slice(0, 100);
  }
  async getCourseUrls(subjectUrl) {
    try {
      const $ = await this.cheerio.load(process.env.BASE_URL + subjectUrl);
      return $(".discovery-card")
        .toArray()
        .map(function (el) {
          return $(el).find(".discovery-card-link").attr("href");
        });
    } catch (err) {
      return [];
    }
  }
  async getCourseInfo(courseUrl) {
    try {
      const $ = await this.cheerio.load(process.env.BASE_URL + courseUrl);
      let courseInfo = {};
      setCourseTitle($, courseInfo);
      setSideBarAttrs($, courseInfo);
      setSession($, courseInfo);
      setOverview($, courseInfo);
      setInstructors($, courseInfo);
      return courseInfo;
    } catch (err) {
      return {};
    }
  }
}
const instance = new WebScraper();
Object.freeze(instance);
module.exports = instance;
