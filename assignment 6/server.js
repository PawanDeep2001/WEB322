/********************************************************************************* *
*  WEB322 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* Of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students. 
* 
* Name: Pawan Deep____ Student ID: 111144218____ Date: 08-05-2022 
* 
* Online (Heroku) Link: https://fast-hollows-19179.herokuapp.com/
* 
********************************************************************************/
var blog= require('./blog-service.js')
var authData =require('./auth-service.js')
var express = require('express')
var app = express()
const multer = require("multer")
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
var PORT = process.env.PORT || 8080;
var path = require('path');
const { Console } = require('console');
const upload = multer();
const exphbs = require('express-handlebars')
const { helpers } = require('handlebars')
const stripJs = require('strip-js');
const clientSessions=require('client-sessions')

app.use(express.urlencoded({extended: true}));

app.use(function(req,res,next){
   let route = req.path.substring(1);
   app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.*)/, "") : route.replace(/\/(.*)/, ""));
   app.locals.viewingCategory = req.query.category;
   next();
});

app.engine('.hbs', exphbs.engine({ 
   extname: '.hbs',
   helpers: {
   navLink: function(url, options){
   return '<li' +
   ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
   '><a href="' + url + '">' + options.fn(this) + '</a></li>';
   },
   equal: function (lvalue, rvalue, options) {
       if (arguments.length < 3)
       throw new Error("Handlebars Helper equal needs 2 parameters");
       if (lvalue != rvalue) {
       return options.inverse(this);
       } else {
       return options.fn(this);
       }
   },
   safeHTML: function(context){
       return stripJs(context);
       },
    formatDate: function(dateObj){
        let year = dateObj.getFullYear();
        let month = (dateObj.getMonth() + 1).toString();
        let day = dateObj.getDate().toString();
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2,'0')}`;
        }
}}));
function ensureLogin(req, res, next) {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      next();
    }
  }
app.set('view engine', '.hbs');

cloudinary.config({
   cloud_name: 'dgd4jx0oj',
   api_key: '888886618663229',
   api_secret: 'fXyAg3pqJC9nfbQnevHVO4dm7Go',
   secure: true
});

app.use(express.static('public'))
app.use(express.static('static'))

app.use(clientSessions({
    cookieName: "session", 
    secret: "web322_app", 
    duration: 2 * 60 * 1000, 
    activeDuration: 1000 * 60 
}));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.get('/', (req,res)=>{
    res.redirect('/blog')
})

app.get('/about', function(req,res){
    res.render(path.join(__dirname,"/views/about.hbs"))
})

app.get('/posts/add',ensureLogin, function(req,res){
    blog.getCategories().then((data)=>{
        res.render("addPost", {categories: data});
    }).catch(()=>{
        res.render("addPost", {categories: []});
    })
})

app.post('/posts/add',ensureLogin, upload.single("featureImage"), function(req, res){
   let streamUpload = (req) => {
       return new Promise((resolve, reject) => {
           let stream = cloudinary.uploader.upload_stream((error, result) => {
               if (result) {
                   resolve(result);
               } else {
                   reject(error);
               }
           });
           streamifier.createReadStream(req.file.buffer).pipe(stream);
       });
   };
   async function upload(req) {
       let result = await streamUpload(req);
       console.log(result);
       return result;
   }
   upload(req).then((uploaded)=> {
        req.body.featureImage = uploaded.url;
        // TODO: Process the req.body and add it as a new Blog Post before redirecting to /posts
        blog.addPost(req.body).then(()=>{
            res.redirect('/posts')
        })
       
   });
})

app.get('/blog', async (req, res) => {

   // Declare an object to store properties for the view
   let viewData = {};

   try{

       // declare empty array to hold "post" objects
       let posts = [];

       // if there's a "category" query, filter the returned posts by category
       if(req.query.category){
           // Obtain the published "posts" by category
           posts = await blog.getPublishedPostsByCategory(req.query.category);
       }else{
           // Obtain the published "posts"
           posts = await blog.getPublishedPosts();
       }

       // sort the published posts by postDate
       posts.sort((a,b) => new Date(b.postDate) - new Date(a.postDate));

       // get the latest post from the front of the list (element 0)
       let post = posts[0]; 

       // store the "posts" and "post" data in the viewData object (to be passed to the view)
       viewData.posts = posts;
       viewData.post = post;

   }catch(err){
       viewData.message = "no results";
   }

   try{
       // Obtain the full list of "categories"
       let categories = await blog.getCategories();

       // store the "categories" data in the viewData object (to be passed to the view)
       viewData.categories = categories;
   }catch(err){
       viewData.categoriesMessage = "no results"
   }

   // render the "blog" view with all of the data (viewData)
   res.render("blog", {data: viewData})
});

app.get('/blog/:id', async (req, res) => {

   // Declare an object to store properties for the view
   let viewData = {};

   try{

       // declare empty array to hold "post" objects
       let posts = [];

       // if there's a "category" query, filter the returned posts by category
       if(req.query.category){
           // Obtain the published "posts" by category
           posts = await blog.getPublishedPostsByCategory(req.query.category);
       }else{
           // Obtain the published "posts"
           posts = await blog.getPublishedPosts();
       }

       // sort the published posts by postDate
       posts.sort((a,b) => new Date(b.postDate) - new Date(a.postDate));

       // store the "posts" and "post" data in the viewData object (to be passed to the view)
       viewData.posts = posts;

   }catch(err){
       viewData.message = "no results";
   }

   try{
       // Obtain the post by "id"
       viewData.post = await blog.getPostById(req.params.id);
   }catch(err){
       viewData.message = "no results";
   }
   try{
       // Obtain the full list of "categories"
       let categories = await blog.getCategories();

       // store the "categories" data in the viewData object (to be passed to the view)
       viewData.categories = categories;
   }catch(err){
       viewData.categoriesMessage = "no results"
   }

   // render the "blog" view with all of the data (viewData)
   res.render("blog", {data: viewData})
});

app.get('/post/:value',ensureLogin, (req,res)=>{
   blog.getPostById(req.params.value).then((arr)=>{
       res.render("posts", {posts: arr})
   }).catch((error)=>{
       res.render("posts", {message: "no results"})
   })
})

app.get('/posts',ensureLogin, (req,res)=>{
   if (req.query.category) {
       blog.getPostsByCategory(req.query.category).then((arr)=>{
           if (arr.length>0) {
            res.render("posts", {posts: arr})
           }
           else{
            res.render("posts", {message: "no results"})
           }
        
       }).catch((error)=>{
           res.render("posts", {message: "no results"})
       })
   }
   else if (req.query.minDate) {
       blog.getPostsByMinDate(req.query.minDate).then((arr)=>{
        if (arr.length>0) {
            res.render("posts", {posts: arr})
           }
           else{
            res.render("posts", {message: "no results"})
           }
       }).catch((error)=>{
           res.render("posts", {message: "no results"})
       })
   }
   else{
       try {
            blog.getAllPosts().then((arr)=>{
                if (arr.length>0) {
                    res.render("posts", {posts: arr})
                   }
                   else{
                    res.render("posts", {message: "no results"})
                   }
            }).catch((error)=>{
               res.render("posts", {message: "no results"})
            })
        } catch (error) {
            res.send({message: error})
        }
   }
})

app.get('/categories',ensureLogin, (req,res)=>{
    try {
        blog.getCategories().then((arr)=>{
            if (arr.length>0) {
                res.render("categories", {categories: arr})
            }
            else{
                res.render("categories", {message: "no results"});
            }
        }).catch((error)=>{
           res.render("categories", {message: "no results"});
        })
    } catch (error) {
        res.send({message: error})
    }
})
app.get('/categories/add',ensureLogin, function(req,res){
    res.render(path.join(__dirname,"/views/addCategory.hbs"))
})

app.post('/categories/add',ensureLogin, function(req, res){
        blog.addCategory(req.body).then(()=>{
            res.redirect('/categories')
        })
 })

app.get('/categories/delete/:id',ensureLogin, function(req,res){
    blog.deleteCategoryById(req.params.id).then(()=>{
        res.redirect('/categories')
    }).catch((err)=>{
        res.send("Unable to Remove Category").status("500")
    })
})
app.get('/post/delete/:id',ensureLogin, function(req,res){
    blog.deletePostById(req.params.id).then(()=>{
        res.redirect('/posts')
    }).catch((err)=>{
        res.send("Unable to Remove Post").status("500")
    })
})

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", (req, res) => {
    authData.registerUser(req.body).then(()=>{
        res.render("register", {successMessage: "User created"})
    }).catch((err)=>{
        res.render("register",{errorMessage: err, userName: req.body.userName})
    })
})

app.post("/login", (req, res) => {
    req.body.userAgent = req.get('User-Agent');
    authData.checkUser(req.body).then((user) => {
        req.session.user = {
        userName: user.userName,
        email: user.email,
        loginHistory: user.loginHistory
    }
    res.redirect('/posts');
    }).catch((err)=>{
        res.render("login",{errorMessage: err, userName: req.body.userName})
    })
})

app.get("/userHistory", ensureLogin, function(req, res) {
    res.render("userHistory")
});
app.get("/logout", function(req, res) {
    req.session.reset();
    res.redirect("/");
});

app.use((req,res)=>{
   res.render("404");
})





blog.initialize()
.then(authData.initialize)
.then(function(){
app.listen(PORT, function(){
console.log("app listening on: " + PORT)
});
}).catch(function(err){
console.log("unable to start server: " + err);
});
