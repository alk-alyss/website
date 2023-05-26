import { getListingById } from "../models/listing.js"
import { addFavoriteListing, getUserByUsername, removeFavoriteListing } from "../models/user.js"
import { translateListing } from "./translate.js"

export async function showListing(req, res, next) {
	let id = req.params.id.toString()

	let currentListing = await getListingById(id)

	if (!currentListing) {
		res.status(404)
		res.redirect('/')
		return
	}

	currentListing.isFavorite = false

	let username = req.session.username
	if (username) {
		let user = await getUserByUsername(username)
		if (user.favoriteListings.includes(currentListing.id)) currentListing.isFavorite = true
	}

	currentListing.price_per_area = Math.floor(currentListing.price / currentListing.area)

	currentListing = await translateListing(currentListing)

	res.render("listing", {
		style: "listing",
		topSearchOn: true,
		listing: currentListing,
	})
}

export async function toggleListing(req, res) {
	let username = req.session.username
	let id = req.params.id.toString()

	let user = await getUserByUsername(username)
	if (user.favoriteListings.includes(id)) {
		removeFavoriteListing(username, id)
	} else {
		addFavoriteListing(username, id)
	}

	res.send()
}