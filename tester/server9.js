const express=require("express")
const app=express()
const fs = require("fs");
const http = require("http");
const https = require("https");
const certs = "./certs";
const HTTPS_PORT = 4433;

app.get('/', (req,res)=>{
    res.send("Express HTTPS server listening on port " + HTTPS_PORT)
})

const https_options = {
    key: fs.readFileSync(certs + "/server.key"),
    cert: fs.readFileSync(certs + "/server.crt")
}

https.createServer(https_options, app).listen(HTTPS_PORT, function(){
    console.log("Express HTTPS server listening on port " + HTTPS_PORT)
})