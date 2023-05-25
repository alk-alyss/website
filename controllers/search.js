import { getListings } from "../models/listing.js"
import { getUserByUsername } from "../models/user.js"

export async function search(req, res, next) {
    let filters = {}

    filters.type = req.query.type
    switch (filters.type) {
        case "sell":
            filters.sell = true
            break
        case "rent":
            filters.rent = true
            break
    }

    filters.category = req.query.category
    switch (filters.category) {
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

    filters.subcategory = req.query.subcategory
    switch (filters.subcategory) {
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

    filters.location = req.query.location

    let priceStart = Number(req.query.price_start)
    let priceEnd = Number(req.query.price_end)

    filters.price = {
        start: priceStart > 0 ? priceStart : 0,
        end: priceEnd > 0 ? priceEnd : 0
    }

    let areaStart = Number(req.query.area_start)
    let areaEnd = Number(req.query.area_end)

    filters.area = {
        start: areaStart > 0 ? areaStart : 0,
        end: areaEnd > 0 ? areaEnd : 0
    }

    filters.state = {
        new: req.query.new != undefined,
        renovated: req.query.renovated != undefined,
        good: req.query.good != undefined,
        old: req.query.old != undefined
    }

    let roomsFrom = Number(req.query.rooms_from)
    let roomsTo = Number(req.query.rooms_to)

    filters.rooms = {
        start: roomsFrom > 0 ? roomsFrom : 0,
        end: roomsTo > 0 ? roomsTo : 0
    }

    let floorFrom = Number(req.query.floor_from)
    let floorTo = Number(req.query.floor_to)

    filters.floors = {
        start: floorFrom > 0 ? floorFrom : 0,
        end: floorTo > 0 ? floorTo : 0
    }

    let yearFrom = Number(req.query.year_from)
    let yearTo = Number(req.query.year_to)

    filters.year = {
        start: yearFrom > 0 ? yearFrom : 0,
        end: yearTo > 0 ? yearTo : 0
    }

    filters.zone = {
        home: req.query.home != undefined,
        commercial: req.query.commercial != undefined,
        industrial: req.query.industrial != undefined,
        agricultural: req.query.agricultural != undefined,
        forest: req.query.forest != undefined,
        tourist: req.query.tourist != undefined
    }

    filters.heating = req.query.heating
    switch (filters.heating) {
        case "autonomous":
            filters.autonomous = true
            break
        case "central":
            filters.central = true
            break
    }

    filters.heating_type = req.query.heating_type
    switch (filters.heating_type) {
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