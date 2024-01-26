// Packages
const express = require("express");
const fs = require('fs')
const { parse } = require('csv-parse');


// express app
const app = express();


// Set engine

app.set("view engine", "ejs");

// Use all files in "Public" cirectory
app.use(express.static("public"));
 
// listen port 3000
app.listen(3000);

var data = []

fs.createReadStream("./public/präsens/all_präsens.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    data.push(row);
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });


app.get("/", (req,res)=>{
    res.render("verben");
});

app.get("/api-present",(req,res)=>{
     res.json(data);
});
