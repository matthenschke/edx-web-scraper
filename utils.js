module.exports = {
  getSideBarAttrs: ($, courseInfo) => {
    const courseAttrs = new Set(["price", "length", "language"]);
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
        } else if (key === "language" && value === "English")
          courseInfo[key] = value;
      }
    });
  },
  getCourseTitle: ($, courseInfo) => {
    courseInfo.title = $(".course-intro-heading").text();
  },
  getSession: ($, courseInfo) => {
    let sessionStr = $(".enroll-btn small").text();
    if (sessionStr) {
      if (sessionStr == "") courseInfo["session"] = null;
      else {
        let sessionStrParts = sessionStr.split(" ");
        let date;
        sessionStrParts.shift();
        if (sessionStrParts instanceof Array) date = sessionStrParts.join(" ");
        else date = sessionStrParts;
        courseInfo["session"] = date;
      }
    }
  },

  getOverview: ($, courseInfo) => {
    const overviewStr = $(".course-intro-lead-in p").text();
    if (overviewStr) courseInfo["overview"] = overviewStr;
  },

  getInstructors: ($, courseInfo) => {
    const instructors = [];
    $(".instructor-list .instructor").each(function (i, el) {
      instructors.push($(el).find(".name").text());
    });
    courseInfo["instructors"] = instructors;
  },
};
