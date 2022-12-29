const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port =process.env.PORT || 5000;


const app = express()

//middle ware
app.use(cors());
app.use(express.json());


const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y8s6gcn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run (){
    try{
        const carBazarCollection = client.db('car-bazar').collection('uploading_data')
        const aboutUpdateCollection = client.db('car-bazar').collection('aboutUpdate')
        

        app.post('/uploading', async(req,res) =>{
            const uploading = req.body;
            console.log(uploading);
            const result = await carBazarCollection.insertOne(uploading)
            res.send(result)
        })

        app.get('/medialPost', async (req,res) =>{
            const query = {}
            const uploading = await carBazarCollection.find(query).toArray()
            res.send(uploading)
        })
        
        // aboutUpdate
        app.post('/aboutUpdate', async (req, res) => {
            const update = req.body;
            const result = await aboutUpdateCollection.insertOne(update);
            res.send(result);
        })

    }
    finally{

    }
}
run().catch(console.log());

app.get('/', async (req, res)=>{
    res.send('social media server is running')
})

app.listen(port, ()=>console.log(`social media server is running ${port}`))
