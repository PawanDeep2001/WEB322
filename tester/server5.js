var mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
var mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Pawan007:<Pawan007.>@senecaweb.ejder6k.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
var courseSchema=new mongoose.Schema({
    'name' : String,
    'section': String,
    'studentCount': Number,
    'professor': String,
    'section': Number
})
