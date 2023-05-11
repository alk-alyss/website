import { addUser } from "../models/user";

export async function sign_up(req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let result = await addUser(username, email, password)

    if (result == "email") {
        return
    }
    if (result == "password") {
        return
    }

    res.redirect("/")
}