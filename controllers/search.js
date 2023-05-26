import { getListings } from "../models/listing.js"
import { getUserByUsername } from "../models/user.js"
import { translateListing } from "./translate.js"

export async function search(req, res, next) {
    let filters = {}

    filters.type = req.query.type
    filters["type_"+filters.type] = true

    filters.category = req.query.category
    filters["category_"+filters.category] = true

    filters.subcategory = req.query.subcategory
    filters["subcategory_"+filters.subcategory] = true

    filters.state = req.query.state
    filters["state_"+filters.state] = true

    filters.zone = req.query.zone
    filters["zone_"+filters.zone] = true

    filters.heating = req.query.heating
    filters["heating_"+filters.heating] = true

    filters.heating_type = req.query.heating_type
    filters["heating_type_"+filters.heating_type] = true

    filters.location = req.query.location

    let priceStart = Math.abs(Number(req.query.price_start))
    let priceEnd = Math.abs(Number(req.query.price_end))

    filters.price = {
        start: !Number.isNaN(priceStart) ? priceStart : 0,
        end: !Number.isNaN(priceEnd) ? priceEnd : 0
    }

    let areaStart = Math.abs(Number(req.query.area_start))
    let areaEnd = Math.abs(Number(req.query.area_end))

    filters.area = {
        start: !Number.isNaN(areaStart) ? areaStart : 0,
        end: !Number.isNaN(areaEnd) ? areaEnd : 0
    }

    let roomsFrom = Math.abs(Number(req.query.rooms_from))
    let roomsTo = Math.abs(Number(req.query.rooms_to))

    filters.rooms = {
        start: !Number.isNaN(roomsFrom) ? roomsFrom : 0 ,
        end: !Number.isNaN(roomsTo) ? roomsTo : 0
    }

    let floorFrom = Math.abs(Number(req.query.floor_from))
    let floorTo = Math.abs(Number(req.query.floor_to))

    filters.floor = {
        start: !Number.isNaN(floorFrom) ? floorFrom : 0 ,
        end: !Number.isNaN(floorTo) ? floorTo : 0
    }

    let yearFrom = Math.abs(Number(req.query.year_from))
    let yearTo = Math.abs(Number(req.query.year_to))

    filters.year = {
        start: !Number.isNaN(yearFrom) ? yearFrom : 0 ,
        end: !Number.isNaN(yearTo) ? yearTo : 0
    }

    filters.extra = {
        parking: req.query.parking != undefined,
        garden: req.query.garden != undefined,
        balcony: req.query.balcony != undefined,
        storage: req.query.storage != undefined,
        fireplace: req.query.fireplace != undefined,
        elevator: req.query.elevator != undefined,
        furnished: req.query.furnished != undefined,
        air_condition: req.query.air_condition != undefined,
        solar_heating: req.query.solar_heating != undefined,
        boiler: req.query.boiler != undefined,
        alarm: req.query.alarm != undefined,
        security_door: req.query.security_door != undefined,
        pets: req.query.pets != undefined,
        student: req.query.student != undefined,
        loading_dock: req.query.loading_dock != undefined
    }

    let listings = await getListings(filters)

    let username = req.session.username
    let user = await getUserByUsername(username)

    for (let listing of listings) {
        if (username) {
            listing.isFavorite = false
            if (user.favoriteListings.includes(listing.id)) listing.isFavorite = true
        }

        listing = await translateListing(listing)
    }

    res.render("search", {
        topSearchOn: true,
        style: "search",
        listings: listings,
        filters: filters
    })
}