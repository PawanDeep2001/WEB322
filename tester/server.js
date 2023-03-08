/*********************************************************************************
* WEB322 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Pawan Deep     Student ID: 111144218        Date: 05/18/2022
*
* Online (Heroku) URL: https://floating-savannah-99464.herokuapp.com/
*
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Pawan Deep - 111144218");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);