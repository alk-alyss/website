import express from "express"
import {create} from "express-handlebars"
const port = 3000

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

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))

// Routes
import home from "./routes/home.js"
import authentication from "./routes/authentication.js"
import search from "./routes/search.js"
import listing from "./routes/listing.js"
import profile from "./routes/profile.js"

app.use(home)
app.use(authentication)
app.use("/search", search)
app.use("/listing", listing)
app.use("/profile", profile)

// Setup database
import { loadData } from "./controllers/startup.js"
await loadData()

// Run server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})