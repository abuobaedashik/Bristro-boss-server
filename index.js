const express = require('express')
const cors = require('cors')
const app =express()
require('dotenv').config()
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const morgan = require("morgan");
var jwt = require('jsonwebtoken');
const port =process.env.PORT || 5000 

// middleware 
app.use(cors())
app.use(express.json())
app.use(morgan("dev"));3



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.g1qcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const MenuCollection = client.db('BristroBoss').collection('MenuCollection')
    const UserCollection = client.db('BristroBoss').collection('Users')
    const ReviewCollection = client.db('BristroBoss').collection('ReviewCollection')
    const CartCollection = client.db('BristroBoss').collection('Carts')
    // const BookedCarCollection =client.db('CarsDB').collection('bookedCar')
     
    // create token api
    app.post('/user',async(req,res)=>{
      const user =req.body
      const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:'1h'
      })
      res.send({token})
    })

    // middleware 
    const verifyToken = (req,res,next)=>{
      console.log("inside verify token",req.headers.authorization);
      if (!req.headers. authorization) {
        return res.status(401).send({message:"forbidden access"})
      }
      const token =req.headers.authorization.split(' ')[1]
      jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if (err) {
          return res.status(401).send({message:"forbidden access"})
        }
        res.decoded =decoded;
        next()
      })
    }

    // all user related apies  

    app.get('/user',verifyToken,async(req,res)=>{
     
      const result = await UserCollection.find().toArray()
      res.send(result)
    })

    app.post('/user',async(req,res)=>{
      const user = req.body;
      const query ={email: user.email}
      const existingUser =await UserCollection.findOne(query)
      if (existingUser) {
        return res.send({message:'user already exist',insertingId:null})
      }
      const result = await UserCollection.insertOne(user)
      res.send(result)
    })

    app.delete('/user/:id',async(req,res)=>{
      const id =req.params.id;
      const query ={_id: new ObjectId(id)}
      const result =await UserCollection.deleteOne(query)
      res.send(result)
    })

    app.patch('/user/admin/:id',async(req,res)=>{
      const id =req.params.id;
      const filter={_id: new ObjectId(id)}
      const updatedDoc ={
        $set:{
          role:'admin'
        }
      }
      const result =await UserCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })





     

    app.get('/menu',async(req,res)=>{
         const result =await MenuCollection.find().toArray()
         res.send(result)
      })
    app.get('/review',async(req,res)=>{
         const result =await ReviewCollection.find().toArray()
         res.send(result)
      })

    // cart apis
    app.get('/carts',async(req,res)=>{
      const email =req.query.email;
      const query ={email:email}
      const result =await CartCollection.find(query).toArray()
      res.send(result)
   })

    app.post('/carts',async(req,res)=>{
      const cardItem = req.body;
      const result = await CartCollection.insertOne(cardItem)
      res.send(result)
    })

    app.delete('/carts/:id',async(req,res)=>{
      const id =req.params.id;
      const query ={_id: new ObjectId(id)}
      const result =await CartCollection.deleteOne(query)
      res.send(result)
    })
  



    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// basic setup 
app.get('/',(req,res)=>{
    res.send("bristro boss server is running  ")
})

app.listen(port,(req,res)=>{
    console.log(`bristro boss server is running on the ----${port}`);
})
