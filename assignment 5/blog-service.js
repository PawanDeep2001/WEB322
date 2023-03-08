const Sequelize = require('sequelize');
var sequelize = new Sequelize('d7u8rc2eslk2u4', 'ikpxxslkykfqaj', '088e0fc15cfec70766955886177e1dba3e81620aafaad2ebbd30488f1005b684', {
host: 'ec2-54-227-248-71.compute-1.amazonaws.com',
dialect: 'postgres',
port: 5432,
dialectOptions: {
ssl: { rejectUnauthorized: false }
},
query: { raw: true }
});
var Post = sequelize.define('Post', {
    body: Sequelize.TEXT,
    title: Sequelize.STRING,
    postDate: Sequelize.DATE,
    featureImage:Sequelize.STRING,
    published:Sequelize.BOOLEAN
});
var Category = sequelize.define('Category', {
    category: Sequelize.STRING
});
Post.belongsTo(Category, {foreignKey: 'category'});
module.exports.initialize=function(){
    return new Promise(function(resolve, reject){
        sequelize.sync().then(()=>{
            resolve('operation successfull')}
        ).catch((err)=>{
            reject("unable to sync the database")}
        )})
}
module.exports.getAllPosts=function(){
    return new Promise(function(resolve, reject){
        Post.findAll().then((data)=>{
            resolve(data)}
        ).catch((err)=>{
            reject("no results returned")
        }
    )})
}
module.exports.getCategories=function(){
    return new Promise(function(resolve, reject){
        Category.findAll().then((data)=>{
            resolve(data)
        }).catch(()=>{
            reject("no results returned")
        })
    })
}
module.exports.getPublishedPosts=function(){
    return new Promise(function(resolve, reject){
        Post.findAll({
            where: {
                published:true
            }
        }).then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject("no results returned")
        })
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
        for (const key in postData) {
           if (key=="") {
            key=null
           }
        }
        postData.postDate = new Date()
        Post.create(postData).then(()=>{
            resolve("success")
        }).catch((err)=>{
            reject("unable to create post")
        })
    })
}

module.exports.getPostsByCategory= function(category){
    return new Promise(function(resolve, reject){
        Post.findAll({
            where: {category:category}
        }).then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject("no results returned")
        })
    })
}

module.exports.getPostsByMinDate= function(minDateStr){
    return new Promise(function(resolve, reject){
        Post.findAll({
            where: {
                postDate: {[gte]: new Date(minDateStr)}
            }
        }).then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject("no results returned")
        })
    })
}

module.exports.getPostById= function(id){
    return new Promise(function(resolve, reject){
        Post.findAll({
            where:{
                id:id
            }
        }).then((data)=>{
            resolve(data[0])
        }).catch((err)=>{
            reject("no results returned")
        })
    })
}
module.exports.getPublishedPostsByCategory=function(category){
    return new Promise(function(resolve, reject){
        Post.findAll({
            where:{
                published:true,
                category:category
            }
        }).then((data)=>{
            resolve(data)
        }).catch((err)=>{
            reject("no results returned")
        })
    })
}
module.exports.addCategory=function(categoryData){
    return new Promise(function(resolve, reject){
        for (const key in categoryData) {
            if (key=="") {
             key=null
            }
         }
         Category.create(categoryData).then(()=>{
            resolve("success")
         }).catch(()=>{
            reject("unable to create category")
         })
    })
}
module.exports.deleteCategoryById=function(id){
    return new Promise(function(resolve, reject){
        Category.destroy({
            where:{
                id:id
            }
        }).then(()=>{
            resolve("success")
        }).catch(()=>{
            reject("unable to delete category")
        })
    })
}
module.exports.deletePostById=function(id){
    return new Promise(function(resolve, reject){
        Post.destroy({
            where:{
                id:id
            }
        }).then(()=>{
            resolve("success")
        }).catch(()=>{
            reject("unable to delete category")
        })
    })
}