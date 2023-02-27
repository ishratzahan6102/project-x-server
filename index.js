
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

// .env 
require('dotenv').config()
const app = express()

const { query } = require('express');

// middle ware
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send("projectX  is running")
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.feigjta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try {

        const services = client.db("projectX").collection("services")

        app.get('/services', async (req, res) => {
            const query = {}
            const result = await services.find(query).toArray()
            res.send(result)
        })

    }

    finally {

    }
}
run().catch(console.log)