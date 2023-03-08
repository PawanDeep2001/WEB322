const { json } = require("express/lib/response")
const fs = require("fs")
var posts
var categories
var post=[]
module.exports.initialize=function(){
    return new Promise(function(resolve, reject){
        fs.readFile('./data/posts.json', 'utf8', (err, data) => {
            if (err){
                reject('unable to read file')
            }
            posts=JSON.parse(data)
        })
        fs.readFile('./data/categories.json', 'utf8', (err, data) => {
            if (err){
                reject('unable to read file')
            }
            categories=JSON.parse(data)
            resolve(data)
        }) 
    })
}
module.exports.getAllPosts=function(){
    return new Promise(function(resolve, reject){
        if (posts.lenght===0) {
            reject('Empty array')
        }
        else{
            resolve(posts)
        }
    })
}
module.exports.getCategories=function(){
    return new Promise(function(resolve, reject){
        if (categories.lenght===0) {
            reject('Empty array')
        }
        else{
            resolve(categories)
        }
    })
}
module.exports.getPublishedPosts=function(){
    return new Promise(function(resolve, reject){
        post=[]
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].published===true) {
                post.push(posts[i])
            }
        }
        if (post.length===0) {
            reject('Empty array')
        }
        else{
            resolve(post)
        }
    })
}

module.exports.addPost= function(postData){
    return new Promise(function(resolve, reject){
        if (postData.published===undefined) {
            postData.published=false
        }
        else{
            postData.published=true
        }
        postData.id= posts.length +1
        date=new Date()
        postData.postDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
        posts.push(postData)
        resolve(postData)
    })
}

module.exports.getPostsByCategory= function(category){
    return new Promise(function(resolve, reject){
        post=[]
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].category==category) {
                post.push(posts[i])
            }
        }
        if (post.length===0) {
            reject('no results returned')
        }
        else{
            resolve(post)
        }
    })
}

module.exports.getPostsByMinDate= function(minDateStr){
    return new Promise(function(resolve, reject){
        post=[]
        for (let i = 0; i < posts.length; i++) {
            if(new Date(posts[i].postDate) >= new Date(minDateStr)){
                post.push(posts[i])
            }
        }
        if (post.length===0) {
            reject('no results returned')
        }
        else{
            resolve(post)
        }
    })
}

module.exports.getPostById= function(id){
    return new Promise(function(resolve, reject){
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id==id) {
                resolve(posts[i])
            }
        }
        if (i==posts.lenght) {
            reject('no results returned')
        }
    })
}
module.exports.getPublishedPostsByCategory=function(category){
    return new Promise(function(resolve, reject){
        post=[]
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].published===true && posts[i].category==category) {
                post.push(posts[i])
            }
        }
        if (post.length===0) {
            reject('Empty array')
        }
        else{
            resolve(post)
        }
    })
}