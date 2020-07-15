var express = require("express");
var router = express.Router();
var https = require("https");
var xml2js = require("xml2js");
var parser = new xml2js.Parser();
var concat = require("concat-stream");

parser.on("error", function (err) {
  console.log("Parser error", err);
});

//gets top news
router.get("/top", function (reqq, res) {
  //   var parseString = require("xml2js").parseString;
  //   var xml = `<?xml version="1.0" encoding="UTF-8" ?><business><company>Code Blog</company><owner>Nic Raboy</owner><employee><firstname>Nic</firstname><lastname>Raboy</lastname></employee><employee><firstname>Maria</firstname><lastname>Campos</lastname></employee></business>`;
  //   parseString(xml, function (err, result) {
  //     console.dir(result);
  //     res.send(result);
  //   });

  let req = https.get(
    "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms",
    function (res) {
      let data = "";
      res.on("data", function (stream) {
        data += stream;
      });
      res.on("end", function () {
        parser.parseString(data, function (error, result) {
          if (error === null) {
            console.log(result.rss.channel[0].item);
          } else {
            console.log(error);
          }
        });
      });
    }
  );
});

module.exports = router;
