var express = require('express')
var path = require('path')

{/* <a href="http://localhost:4000/insertProduct"> insert </a> */}
{/* <a href="http://localhost:4000/deleteAll"> delete </a> */}

const PORT = process.env.PORT || 3001
const app = express()

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/intern-shop';

app.get('/getProduct', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if(!err){
        var collection = db.collection('products')
        collection.find({}).toArray((err, productStore) => {
        console.log(productStore)
        console.log("SelectData Complete...")
        res.send(productStore)
        })
    }
    else console.log(err)
    db.close()
  })
})

app.get('/insertProduct', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if(!err){
      db.collection('products').insert([
        { "_id" : "1", "name" : "A", "price" : "10$" },
        { "_id" : "2", "name" : "B", "price" : "20$" },
        { "_id" : "3", "name" : "C", "price" : "30$" },
        { "_id" : "4", "name" : "D", "price" : "40$" },
        { "_id" : "5", "name" : "E", "price" : "50$" },
      ])
      console.log("Insert Complete...")
      res.send("Insert Complete...")
    }
    else console.log(err)
    db.close()
  })
})

app.get('/deleteAll', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if(!err){
        var collection = db.collection('products')
        collection.deleteMany({})
      console.log("Delete Complete...")
      res.send("Delete Complete...")
    }
    else console.log(err)
    db.close()
  })
})

app.use(express.static(path.resolve(__dirname,'../serverShop/public')))

app.get('/',(req,res)=>{
  console.log("into home");
  res.sendFile(path.resolve(__dirname,'../public/index.html'))
})

// app.get('/test',(req,res)=>{
//   console.log("into apiTest");
//   res.sendFile(path.resolve(__dirname,'../public/apiTest/index.html'))
// })

app.listen(PORT,()=>console.log(`listening on ${PORT} ...`))
