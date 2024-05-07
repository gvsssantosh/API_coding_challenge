
//const path = require('path');
const express = require("express");
var bodyParser = require("body-parser");
const customerRouter = require("./src/controller/customerServiceController");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/customerApi", customerRouter);


app.get("/", (req, res) => {
    let resultStr = "<h1 align='center'>Welcome to Node API Coding Challenge<h1/>";
    res.send(resultStr);
});

app.listen(3002, function () { });
console.log("browser link at http://localhost:3002");


module.exports = app;