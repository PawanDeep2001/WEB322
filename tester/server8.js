/********************************************************************************* *
*  WEB322 – Assignment 03 
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* Of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students. 
* 
* Name: Pawan Deep____ Student ID: 111144218____ Date: 06-17-2022 
* 
* Online (Heroku) Link: https://blooming-fortress-31827.herokuapp.com
* 
********************************************************************************/
 /*var blog= require('./blog-service.js')
 var express = require('express');
 var app = express();
 const multer = require("multer");
 const cloudinary = require('cloudinary').v2
 const streamifier = require('streamifier')
 var PORT = process.env.PORT || 8080;
 var path = require('path');
 const { Console } = require('console');
 const upload = multer();

 cloudinary.config({
    cloud_name: 'dgd4jx0oj',
    api_key: '888886618663229',
    api_secret: 'fXyAg3pqJC9nfbQnevHVO4dm7Go',
    secure: true
 });

 app.use(express.static('public'))
 
 app.get('/', (req,res)=>{
     res.redirect('/about')
 })
 
 app.get('/about', function(req,res){
     res.sendFile(path.join(__dirname,"/views/about.html"))
 })
 
 app.get('/posts/add', function(req,res){
     res.sendFile(path.join(__dirname,"/views/addPost.html"))
 })

 app.post('/posts/add', upload.single("featureImage"), function(req, res){
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
        blog.addPost(req.body)
        res.redirect('/posts')
    });
 })
 
 app.get('/blog', (req,res)=>{
     try {
         blog.getPublishedPosts().then((arr)=>{
             res.json(arr)
         }).catch((error)=>{
            res.send({message: error})
         })
     } catch (error) {
         res.send({message: error})
     }
 })
 
 app.get('/post/:value', (req,res)=>{
    blog.getPostById(req.params.value).then((arr)=>{
        res.json(arr)
    }).catch((error)=>{
         res.send({message: error})
    })
 })

 app.get('/posts', (req,res)=>{
    if (req.query.category) {
        blog.getPostsByCategory(req.query.category).then((arr)=>{
            res.json(arr)
        }).catch((error)=>{
             res.send({message: error})
        })
    }
    else if (req.query.minDate) {
        blog.getPostsByMinDate(req.query.minDate).then((arr)=>{
            res.json(arr)
        }).catch((error)=>{
             res.send({message: error})
        })
    }
    else{
        try {
             blog.getAllPosts().then((arr)=>{
                 res.json(arr)
             }).catch((error)=>{
                res.send({message: error})
             })
         } catch (error) {
             res.send({message: error})
         }
    }
 })
 
 app.get('/categories', (req,res)=>{
     try {
         blog.getCategories().then((arr)=>{
             res.json(arr)
         }).catch((error)=>{
            res.send({message: error})
         })
     } catch (error) {
         res.send({message: error})
     }
 })
 
 app.use((req,res)=>{
     res.status(404).send('Page Not Found')
 })
 
 blog.initialize().then(()=>{
     app.listen(PORT, ()=>{
         console.log('Express http server listening on', PORT)
     })
 }).catch((error)=>{    
     console.log('the error is', error)
 })
 */
 const Sequelize = require('sequelize');

 // set up sequelize to point to our postgres database
 var sequelize = new Sequelize('db25g6paatgt5f', 'aqydwanrusaaag', 'f486d3dcdec371dae7a014447aab52780ec0bd5ad46f0b74adc1d6073ba76e44', {
     host: 'ec2-34-200-35-222.compute-1.amazonaws.com',
     dialect: 'postgres',
     port: 5432,
     dialectOptions: {
         ssl: { rejectUnauthorized: false }
     },
     query: { raw: true }
 });

var Student = sequelize.define('Student', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.STRING,
    program: Sequelize.STRING,
    semester: Sequelize.INTEGER
} , {
    createdAt:false,
    updatedAt:false
});

sequelize.sync().then(function () {
    Student.create({
        name: 'Pawan',
        program: 'CPP',
        semester:3,
        id:1
    }).then(function (project) {
        console.log("success!")
    }).catch(function (error) {
        console.log("something went wrong!");
    });
    Student.create({
        name: 'PawanJR',
        program: 'CPP',
        semester:2,
        id:2
    }).then(function (project) {
        console.log("success!")
    }).catch(function (error) {
        console.log("something went wrong!");
    });
    Student.create({
        name: 'PawanDeep',
        program: 'CPP',
        semester:1,
        id:3
    }).then(function (project) {
        console.log("success!")
    }).catch(function (error) {
        console.log("something went wrong!");
    });
});

sequelize.sync().then(function () {
    Student.update({
        name:'tom',
        program:'CPA'
    },{
        where:{
            semester:3
        }
    }).then(function (project) {
        console.log("success!")
    }).catch(function (error) {
        console.log("something went wrong!");
    });
});

sequelize.sync().then(function () {
    Student.destroy({
        where:{
            semester:3
        }
    }).then(function (project) {
        console.log("success!")
    }).catch(function (error) {
        console.log("something went wrong!");
    });
});