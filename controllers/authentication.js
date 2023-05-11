import bcrypt from "bcrypt"
import { addUser, getPassword } from "../models/user.js";

export async function sign_in(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let storedPassword = await getPassword(email)

    if (!storedPassword) {
        res.redirect("/")
        return
    }

    let match = await bcrypt.compare(password, storedPassword)

    if (match) console.log("success")

    res.redirect("/")
}

export async function sign_up(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let hash = await bcrypt.hash(password, 10)

    let result = await addUser(username, email, hash)

    if (result == "email") {
        res.redirect("/")
        return
    }
    if (result == "password") {
        res.redirect("/")
        return
    }

    res.redirect("/")
}

export async function checkAuthentication(req, res, next) {
    let authentication = false;

    if (authentication) {
        next()
    }
    else {
        res.redirect('/sign_in')
    }
}