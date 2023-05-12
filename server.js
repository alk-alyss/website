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
    helpers: {
        slice(context, options) {
            let ret = ""
            let start = parseInt(options.hash.start, 10) || 0
            let end = parseInt(options.hash.end, 10) || 5
            let i, j

            i = (start < context.length) ? start : 0;

            j = (end < context.length) ? end : context.length;

            for (i, j; i < j; i++) {
                ret += options.fn(context[i]);
            }

            return ret;
        }
    }
})

app.engine( 'hbs', hbs.engine)
app.set('view engine', 'hbs')

// Setup session controll
const sessionConf = {
    secret: "x:f#+?T_826y$58D!NTdPlQ,<N",
    cookie: { maxAge: 5 * 60 * 1000 },
    resave: false,
    saveUninitialized: false
}

import session from "express-session"

app.use(session(sessionConf))

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