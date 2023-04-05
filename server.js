const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/public'))
app.use("/icons", express.static(__dirname + '/icons'))
app.use("/styles", express.static(__dirname + '/styles'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/view/home.html")
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})