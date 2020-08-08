// webscraper class for webscraping urls

class WebScraper {
  constructor() {
    if (!WebScraper.instance) {
      this.http = require("./http");
      this.cheerio = require("cheerio");
      WebScraper.instance = this;
    }
    return WebScraper.instance;
  }
  async load(url) {
    try {
      const { data } = await this.http.get(url);
      return this.cheerio.load(data);
    } catch (err) {
      return null;
    }
  }
}
const instance = new WebScraper();
Object.freeze(instance);
module.exports = instance;
