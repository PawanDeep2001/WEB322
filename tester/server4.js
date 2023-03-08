var express = require('express')
const exphbs=require('express-handlebars')

var app = express()
var PORT = process.env.PORT || 8080

app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    helpers:{
        bold: function(options){
            return '<center><strong style="color: blue">' + options.fn(this)+'</strong></center>'
        }
    }
}))
app.set('view engine', '.hbs')

app.get('/', (req,res)=>{
    res.send('<h1> Our template Engine</h1>')
})

app.get('/viewdata', (req,res)=>{
    var albums = [
        {
          artist: "Kanye West",
          title: "Graduation",
          year: 2007,
          lyrics: "Stronger",
        },
        {
          artist: "Kanye West",
          title: "808s and HeartBreak",
          year: 2008,
          lyrics: "Love",
          musicPath: "/music/paranoid_kanye.mp3"
        },
        {
          artist: "Kanye West",
          title: "Yeezus",
          year: 2013
        }
      ]

    res.render('main', {
        data:albums,
        layout: false
    })
})

app.listen(PORT, ()=>{
    console.log('Express http server listening on', PORT)
})