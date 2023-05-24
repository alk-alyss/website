import { getListings } from "../models/listing.js"
import { getUserByUsername } from "../models/user.js"

export async function search(req, res, next) {
    let type = req.query.type
    let category = req.query.category
    let location = req.query.location.toLowerCase()

    let priceStart = Number(req.query.price_start)
    let priceEnd = Number(req.query.price_end)
    let areaStart = Number(req.query.area_start)
    let areaEnd = Number(req.query.area_end)

    priceStart = priceStart > 0 ? priceStart : -1
    priceEnd = priceEnd > 0 ? priceEnd : -1
    areaStart = areaStart > 0 ? areaStart : -1
    areaEnd = areaEnd > 0 ? areaEnd : -1

    let listings = await getListings(type, location, category, priceStart, priceEnd, areaStart, areaEnd)

    let username = req.session.username
	if (username) {
		let user = await getUserByUsername(username)
        for (let listing of listings) {
            listing.isFavorite = false
            if (user.favoriteListings.includes(listing.id)) listing.isFavorite = true
        }
	}

    res.render("search", {
        topSearchOn: true,
        style: "search",
        listings: listings
    })
}