const express = require('express')
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5006
const cors = require('cors')
app.use(cors())
app.use(express.json())

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f8w8siu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(uri);

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


  async function run() {
    try {
    //   const coffeeCollection = client.db('coffeeDB').collection('coffee')
    //   const userCollection = client.db('coffeeDB').collection('user')
    
    const itemsCollection = client.db('itemsDB').collection('items')

    app.get('/item',async(req,res)=>{
        const cursor = itemsCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })
    app.get('/item/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await itemsCollection.findOne(query)
      res.send(result)
  })
    // 
    app.post('/item',async(req,res)=>{
         const items = req.body 
         console.log(items,'result');
         const result = await itemsCollection.insertOne(items)
         res.send(result)
    })

    app.delete('/item/:id',async(req,res)=>{
      const id = req.params.id 
      const query = {_id : new ObjectId(id)}
      const result = await itemsCollection.deleteOne(query)
      res.send(result)
      console.log('id is delete');
    })

    // 
    app.put('/item/:id', async(req,res)=>{
      const id = req.params.id
      const User = req.body
      console.log(User);
      const filter = {_id:new ObjectId(id)}
      const options = {upsert: true}
// 
      const updateUser = {
         $set:{
          image: User.image,
          spot:User.spot,
          countries:User.countries,
          location:User.location,
          description:User.description,
          average_cost:User.average_cost,
          seasonality: User.seasonality,
          Travel:User.Travel,
          totaVisitorsPerYear:User.totaVisitorsPerYear

         }
      }
      const result = await itemsCollection.updateOne(filter, updateUser,options)
      res.send(result)
     
   })

      
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      
    }
  }
  run().catch(console.dir);
  
  
  
  
  
  
  app.get('/', (req, res) => {
      res.send('Hello World! it s me how are you i am localhost')
    })
  
  
  
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  
    
  
