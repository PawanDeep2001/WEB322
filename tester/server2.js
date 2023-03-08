var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('static'))
app.get('/', (req,res)=>{
    res.send("<h1>Welcome to our application!!!!</h1><br> Also check our <a href='/about'> About </a> Page")
})

app.get('/about', function(req,res){
    res.send(req.headers)
})

app.get('/error', function(req,res){
    res.send('<h1> Page Not Found!!! ')
})

app.use((req,res, next)=>{
    console.log('We are in the middle of running the middleware')
    next()
})

app.use("/products/:id",(req,res,next)=>{
    console.log('Request type is ', req.method)
    console.log(req.params)
    res.send('<h2>Welcome to the product page!!!</h2>')
})

app.use((req,res)=>{
    res.status(404).redirect('/error')
})

app.listen(PORT, ()=>{
    console.log('Express http server listening on', PORT)
})

