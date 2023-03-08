var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

app.get('/Documents/web322/views', (req,res)=>{
    res.send("Hello from our first application!!!!<br> Also check our <a href='/about'> About </a> Page")
})

app.listen(PORT, ()=>{
    console.log('Express HTTP server is listening to the port ', PORT)
})