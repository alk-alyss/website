import { getListingById } from "../models/listing.js"
import { getUserByUsername, updateUser } from "../models/user.js"
import { translateListing } from "./translate.js"

export async function renderProfile(req, res) {
    let username = req.session.username
    let user = await getUserByUsername(username)

    let favoriteListings = []
    user.favoriteListings.forEach(async listing => {
        let favoriteListing = await translateListing(await getListingById(listing))
        favoriteListing.isFavorite = true
        favoriteListings.push(favoriteListing)
    });

    res.render("profile", { style: "profile", user:user, favoriteListings:favoriteListings})
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