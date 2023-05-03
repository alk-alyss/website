import * as listing from "../models/listing.js"

export async function showListing(req, res, next) {
	let id = req.params.id

	let currentListing = await listing.getListingById(id)

	console.log(currentListing)

	res.render("listing", {
		style: "search",
		topSearchOn: true,
		listing: currentListing
	})
}