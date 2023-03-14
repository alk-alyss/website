const express = require('express')
const app = express()
const port = 3000

const { MongoClient } = require('mongodb')
const dbUrl = 'mongodb://db:27017'
const client = new MongoClient(dbUrl)

async function main() {
    await client.connect()
    console.log("connected to database")
    const db = client.db("website")
    const properties = db.collection("properties")


    return 'done'
}

main().then(console.log).catch(cosole.error).finally(() => client.close());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})