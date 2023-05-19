import bcrypt from "bcrypt"
import { addUser, getUser } from "../models/user.js";

export async function sign_in(req, res) {
    let email = req.body.email
    let password = req.body.password

    let user = await getUser(email)

    if (!user) {
        res.redirect("/")
        return
    }

    let match = await bcrypt.compare(password, user.password)

    if (!match) {
        res.redirect("/")
        return
    }

    req.session.regenerate((err) => {
        req.session.username = user.username

        req.session.save((err) => {
            res.redirect("/profile")
        })
    })

}

export async function sign_up(req, res) {
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password

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

    req.session.username = username

    res.redirect("/profile")
}

export async function sign_out(req, res) {
    req.session.username = null

    req.session.save((err) => {
        req.session.regenerate((err) => res.redirect("/"))
    })
}

export async function checkAuthentication(req, res, next) {
    let authentication = req.session.username;

    if (authentication) {
        next()
    }
    else {
        res.redirect("/sign_in")
    }
}