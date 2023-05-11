import bcrypt from "bcrypt"
import { getPassword } from "../models/user.js";

export async function sign_in(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let storedPassword = await getPassword(email)

    if (!storedPassword) return

    let match = await bcrypt.compare(password, storedPassword)

    res.redirect("/")
}