import { getListings } from "../models/listing.js"
import { getUserByUsername, updateUser } from "../models/user.js"

export async function renderProfile(req, res) {
    let listings = await getListings()
    listings = listings.slice(0, 10)

    let username = req.session.username
    let user = await getUserByUsername(username)

    res.render("profile", { style: "profile", listings: listings, user:user})
}

export async function updateProfile(req, res) {
    try {
        let name = req.body.name
        let surname = req.body.surname
        let email = req.body.email
        let phone = req.body.phone.toString()

        let username = req.session.username

        await updateUser(username, name, surname, email, phone)

    } finally {
        res.redirect("/profile")
    }
}