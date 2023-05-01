import * as listing from "../models/listing.js"

export function search(req, res, next) {
    let type = req.query.type
    let category = req.query.category
    let location = req.query.location

    let priceStart = Number(req.query.price_start)
    let priceEnd = Number(req.query.price_end)
    let areaStart = Number(req.query.area_start)
    let areaEnd = Number(req.query.area_end)

    priceStart = priceStart == NaN ? -1 : priceStart
    priceEnd = priceEnd == NaN ? -1 : priceEnd
    areaStart = areaStart == NaN ? -1 : areaStart
    areaEnd = areaEnd == NaN ? -1 : areaEnd

    listings = listing.getListings(type, location, category, priceStart, priceEnd, areaStart, areaEnd)

    console.log(listings)

    res.render("search")
}