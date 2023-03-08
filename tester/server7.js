const express = require("express")
const app = express()
const path = require("path")
const exphbs=require("express-handlebars")

app.use(express.urlencoded({ extended: false }))
const HTTP_PORT = process.env.PORT || 8080

app.engine(".hbs", exphbs.engine({extname:".hbs"}))
const user = {
    username: "PawanDeep",
    password: "123456789",
    email: "pdeep1@gmail.com"
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "homepage.html"))
});
  
app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "login.html"))
});
  
  // The login route that adds the user to the session
app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email=req.body.email
    if(username === "" || password === "") {
      return res.render("login", { errorMsg: "Missing credentials.", layout: false });
    }
    if(username === user.username && password === user.password){
        req.session.user = {
            username: user.username,
            email: user.email
        };
    } else {
        res.render("login", { errorMsg: "invalid username or password!", layout: false});
    }
  });
  
  app.listen(HTTP_PORT, () => {
    console.log("Express on PORT: " + HTTP_PORT);
});