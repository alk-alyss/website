const express = require('express')
const hbs = require('express-handlebars')
const port = 3000

// Setup express and handlebars
const app = express()
app.engine(
    'hbs',
    hbs({
        defaultLayout: 'main',
        extname: '.hbs'
    })
)
app.set('view engine', 'hbs')

// Add static folders
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