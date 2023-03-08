
const { query } = require('express');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var path=require('path')

app.all('/test',(req, res)=>{
    res.status(200).end()
})

app.get('/employee/:num', (req,res)=>{
    res.json({employeeNum: req.params.num})
})

app.get('/employeeDocs/PT', (req,res)=>{
    res.download(path.join(__dirname,"ptGuide.pdf"))
})

app.get('/employees', (req, res)=> {
    if (req.query.department) {
        res.json({message: req.query.department})
    }
    else if(req.query.contract){
        res.json({message: req.query.contract})
    }
    else{
        res.json({message: "all employees"})
    }
})

app.listen(PORT, ()=>{
    console.log('Express http server listening on', PORT)
})

/*
function delay(m,ms){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(m)
            resolve("m")
        }, ms)
    })
}
delay('web',2000).then(function(){
console.log('322')
})
*/
/*
class Sprite{
    xPos=0;
    yPos=0;
    updatePosition(deltaX, deltaY, speed){
        this.xPos+=deltaX*speed
        this.yPos+=deltaY*speed
    }
    getCoordinate(){
        var x=this.xPos
        var y=this.yPos
        var a={x,y}
        return a
    }
    constructor(x, y){
        this.xPos=x
        this.yPos=y
    }
}
*/
