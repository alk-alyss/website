const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'))
app.use("/icons", express.static(__dirname + '/icons'))
app.use("/styles", express.static(__dirname + '/styles'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/view/home.html")
})

app.get('/sign_in', (req, res) => {
    res.sendFile(__dirname + "/view/sign_in.html")
})

app.get('/sign_up', (req, res) => {
    res.sendFile(__dirname + "/view/sign_up.html")
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})