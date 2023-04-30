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

// Routes
import { sign_in_router } from "./routes/sign_in.js"
import { sign_up_router } from "./routes/sign_up.js"

app.use(sign_in_router)
app.use(sign_up_router)

// Index route
app.get('/', (req, res) => {
    res.render("home")
})

// Run server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})