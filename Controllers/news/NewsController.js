var express = require("express");
var router = express.Router();
var https = require("https");
var xml2js = require("xml2js");
var parser = new xml2js.Parser();

const verifyToken = require("../auth/VerifyToken");

parser.on("error", function (err) {
  console.log("Parser error", err);
});

//TOP NEWS ROUTE
//feed from IndiaTimes
router.get("/top", verifyToken, function (req, response) {
  https.get(
    "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
    function (res) {
      let data = "";
      res.on("data", function (stream) {
        data += stream;
      });
      res.on("end", function () {
        parser.parseString(data, function (error, result) {
          if (error === null) {
            var feed = result.rss.channel[0].item;
            let news = [];
            feed.map((obj) => {
              let story = {};
              let desc = JSON.stringify(obj.description[0]);
              var cleanString = desc.replace(/\\n|\\r|\\|"/g, "").trim();
              story["title"] = obj.title[0];
              story["desc"] = cleanString;
              story["link"] = obj.link[0];
              if (typeof obj.category !== "undefined") {
                story["category"] = obj.category[0];
              }
              story["pubDate"] = obj.pubDate[0];
              news.push(story);
            });
            response.send(news);
          } else {
            console.log(error);
          }
        });
      });
    }
  );
});

//india news
//news feed from THE HINDU
router.get("/india", verifyToken, function (req, response) {
  https.get(
    "https://www.thehindu.com/news/national/feeder/default.rss",
    function (res) {
      let data = "";
      res.on("data", function (stream) {
        data += stream;
      });
      res.on("end", function () {
        parser.parseString(data, function (error, result) {
          if (error === null) {
            var feed = result.rss.channel[0].item;
            let news = [];
            feed.map((obj) => {
              let story = {};
              let desc = JSON.stringify(obj.description[0]);
              var cleanString = desc.replace(/\\n|\\r|\\|"/g, "").trim();
              story["title"] = obj.title[0];
              story["desc"] = cleanString;
              story["link"] = obj.link[0];
              if (typeof obj.category !== "undefined") {
                story["category"] = obj.category[0];
              }
              story["pubDate"] = obj.pubDate[0];
              news.push(story);
            });
            response.send(news);
          } else {
            console.log(error);
          }
        });
      });
    }
  );
});

module.exports = router;
