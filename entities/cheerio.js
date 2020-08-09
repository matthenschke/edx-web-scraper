// cheerio class for loading urls to cheerio

class Cheerio {
  constructor() {
    if (!Cheerio.instance) {
      this.http = require("./http");
      this.cheerio = require("cheerio");
      Cheerio.instance = this;
    }
    return Cheerio.instance;
  }
  async load(url) {
    try {
      const res = await this.http.get(url);
      return this.cheerio.load(res.data);
    } catch (err) {
      return null;
    }
  }
}
const instance = new Cheerio();
Object.freeze(instance);
module.exports = instance;
