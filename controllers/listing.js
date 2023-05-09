import * as listing from "../models/listing.js"

export async function showListing(req, res, next) {
	let id = req.params.id.toString()

	let currentListing = await listing.getListingById(id)

	if (!currentListing) {
		res.status(404)
		res.redirect('/')
		return
	}

	res.render("listing", {
		style: "listing",
		topSearchOn: true,
		listing: currentListing
	})
}