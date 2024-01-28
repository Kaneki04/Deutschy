const express = require("express");
const fs = require('fs');
const { parse } = require('csv-parse');

const app = express();
app.use(express.static("public"));
app.listen(3000);

function readCSV(tense, num, callback) {
  var data = [];
  fs.createReadStream(`./public/${tense}/${tense}${num}.csv`)
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

app.get("/cards", (req, res) => {
  res.sendFile(__dirname + "/views/cards.html");
});



var infinitivLevels = 20;
for (let i = 0; i < infinitivLevels; i++) {
  (function (index) {
    app.get(`/api-present${i + 1}`, (req, res) => {
      readCSV("präsens", (index+1), (error, data) => {
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

var wortLevels = 28;

for (let i = 0; i < wortLevels; i++) {
  (function (index) {
    app.get(`/api-wort${i + 1}`, (req, res) => {
      readCSV("words",(index+1), (error, data) => {
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

var descriptionLevels = 16;
for (let i = 0; i < descriptionLevels; i++) {
  (function (index) {
    app.get(`/api-description${i + 1}`, (req, res) => {
      readCSV("description",(index+1), (error, data) => {
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