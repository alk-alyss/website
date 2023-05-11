import bcrypt from "bcrypt"
import { addUser } from "../models/user.js";

export async function sign_up(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let hash = await bcrypt.hash(password, 10)

    let result = await addUser(username, email, hash)

    if (result == "email") {
        return
    }
    if (result == "password") {
        return
    }

    res.redirect("/")
}