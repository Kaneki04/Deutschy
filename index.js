const express = require("express");
const fs = require('fs');
const { parse } = require('csv-parse');

const app = express();
app.use(express.static("public"));
app.listen(3000);

function readCSV(num, callback) {
  var data = [];
  fs.createReadStream(`./public/präsens/präsens${num}.csv`)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      data.push(row);
    })
    .on("end", function () {
      console.log("finished");
      callback(null, data);
    })
    .on("error", function (error) {
      console.log(error.message);
      callback(error, null);
    });
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/main.html");
});


app.get("/infinitiv", (req, res) => {
  res.sendFile(__dirname + "/views/verben.html");
});

var maxLevels = 20;
for (let i = 0; i < maxLevels; i++) {
  (function (index) {
    app.get(`/api-present${i + 1}`, (req, res) => {
      readCSV((index+1), (error, data) => {
        if (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        } else {
          res.json(data);
        }
      });
    });
  })(i);
}