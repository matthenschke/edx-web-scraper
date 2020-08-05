// http class used for axios requests

class HTTP {
  constructor() {
    if (!HTTP.instance) {
      this.axios = require("axios");
      HTTP.instance = this;
    }
    return HTTP.instance;
  }
  get(url) {
    return this.axios.get(url);
  }
  post(url) {
    return this.axios.post(url);
  }
}
const instance = new HTTP();
Object.freeze(instance);
module.exports = instance;
