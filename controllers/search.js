import * as listing from "../models/listing.js"

export async function search(req, res, next) {
    let type = req.query.type
    let category = req.query.category
    let location = req.query.location

    let priceStart = Number(req.query.price_start)
    let priceEnd = Number(req.query.price_end)
    let areaStart = Number(req.query.area_start)
    let areaEnd = Number(req.query.area_end)

    priceStart = priceStart > 0 ? priceStart : -1
    priceEnd = priceEnd > 0 ? priceEnd : -1
    areaStart = areaStart > 0 ? areaStart : -1
    areaEnd = areaEnd > 0 ? areaEnd : -1

    let listings = await listing.getListings(type, location, category, priceStart, priceEnd, areaStart, areaEnd)

    res.render("search", {
        topSearchOn: true,
        style: "search",
        listings: listings
    })
}