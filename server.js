import express from "express"
import {create} from "express-handlebars"
const port = 8000

import { URL } from "url"
const __dirname = new URL('.', import.meta.url).pathname;

// Setup express and handlebars
const app = express()
const hbs = create({
    defaultLayout: "main",
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts',
})

app.engine( 'hbs', hbs.engine)
app.set('view engine', 'hbs')

// Configure static folders
app.use(express.static(__dirname + '/public'))

// Routes
import home from "./routes/home.js"
import sign_in from "./routes/sign_in.js"
import sign_up from "./routes/sign_up.js"
import search from "./routes/search.js"

app.use(home)
app.use("/sign_in", sign_in)
app.use("/sign_up", sign_up)
app.use("/search", search)

// Run server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})