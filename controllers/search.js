import { getListings } from "../models/listing.js"
import { getUserByUsername } from "../models/user.js"

export async function search(req, res, next) {
    let filters = {}

    let type = req.query.type
    switch (type) {
        case "sell":
            filters.sell = true
            break
        case "rent":
            filters.rent = true
            break
    }

    let category = req.query.category
    switch (category) {
        case "residential":
            filters.residential = true
            break
        case "commercial":
            filters.commercial = true
            break
        case "land":
            filters.land = true
            break
    }

    let subcategory = req.query.subcategory
    switch (subcategory) {
        case "studio":
            filters.studio = true
            break
        case "house":
            filters.house = true
            break
        case "complex":
            filters.complex = true
            break
        case "maisonette":
            filters.maisonette = true
            break
        case "appartment":
            filters.appartment = true
            break
        case "penthouse":
            filters.penthouse = true
            break
        case "office":
            filters.office = true
            break
        case "warehouse":
            filters.warehouse = true
            break
        case "industrial":
            filters.industrial = true
            break
        case "hotel":
            filters.hotel = true
            break
        case "business":
            filters.business = true
            break
        case "show_room":
            filters.show_room = true
            break
        case "shop":
            filters.shop = true
            break
        case "land":
            filters.land = true
            break
        case "field":
            filters.field = true
            break
        case "island":
            filters.island = true
            break
        case "other":
            filters.subcategory_other = true
            break
    }

    let location = req.query.location

    let priceStart = Number(req.query.price_start)
    let priceEnd = Number(req.query.price_end)
    let areaStart = Number(req.query.area_start)
    let areaEnd = Number(req.query.area_end)

    filters.priceStart = priceStart > 0 ? priceStart : -1
    filters.priceEnd = priceEnd > 0 ? priceEnd : -1
    filters.areaStart = areaStart > 0 ? areaStart : -1
    filters.areaEnd = areaEnd > 0 ? areaEnd : -1

    filters.stateNew = req.query.new != undefined
    filters.stateRenovated = req.query.renovated != undefined
    filters.stateGood = req.query.good != undefined
    filters.stateOld = req.query.old != undefined

    let roomsFrom = Number(req.query.rooms_from)
    let roomsTo = Number(req.query.rooms_to)
    let floorFrom = Number(req.query.floor_from)
    let floorTo = Number(req.query.floor_to)
    let yearFrom = Number(req.query.year_from)
    let yearTo = Number(req.query.year_to)

    filters.roomsFrom = roomsFrom > 0 ? roomsFrom : -1
    filters.roomsTo = roomsTo > 0 ? roomsTo : -1
    filters.floorFrom = floorFrom > 0 ? floorFrom : -1
    filters.floorTo = floorTo > 0 ? floorTo : -1
    filters.yearFrom = yearFrom > 0 ? yearFrom : -1
    filters.yearTo = yearTo > 0 ? yearTo : -1

    filters.home = req.query.home != undefined
    filters.commercial = req.query.commercial != undefined
    filters.industrial = req.query.industrial != undefined
    filters.agricultural = req.query.agricultural != undefined
    filters.forest = req.query.forest != undefined
    filters.tourist = req.query.tourist != undefined

    let heating = req.query.heating
    switch (heating) {
        case "autonomous":
            filters.autonomous = true
            break
        case "central":
            filters.central = true
            break
    }

    let heating_type = req.query.heating_type
    switch (heating_type) {
        case "oil":
            filters.oil = true
            break
        case "gas":
            filters.gas = true
            break
        case "wood":
            filters.wood = true
            break
        case "electricity":
            filters.electricity = true
            break
        case "geothermal":
            filters.geothermal = true
            break
        case "solar":
            filters.solar = true
            break
        case "other":
            filters.heating_type_other = true
            break
    }

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
        listings: listings,
        filters: filters
    })
}