import express from "express"
import {create} from "express-handlebars"
const port = 80

import { URL } from "url"
const __dirname = new URL('.', import.meta.url).pathname;

// Setup express and handlebars
const app = express()
const hbs = create({
    defaultLayout: false,
    extname: '.hbs'
})

app.engine( 'hbs', hbs.engine)
app.set('view engine', 'hbs')

// Configure static folders
app.use(express.static(__dirname + '/public'))

// Define routes
app.get('/', (req, res) => {
    res.render("home")
})

app.get('/sign_in', (req, res) => {
    res.render("sign_in")
})

app.get('/sign_up', (req, res) => {
    res.render("sign_up")
})

// Run server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})