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
  async scrape(url) {
    const { data } = await this.http.get(url);
    return this.cheerio.load(data);
  }
}
const instance = new WebScraper();
Object.freeze(instance);
module.exports = instance;
