import { getListings } from "../models/listing.js"
import { getUserByUsername } from "../models/user.js"

export async function search(req, res, next) {
    let filters = {}

    filters.type = req.query.type
    switch (filters.type) {
        case "sell":
            filters.type_sell = true
            break
        case "rent":
            filters.type_rent = true
            break
    }

    filters.category = req.query.category
    switch (filters.category) {
        case "residential":
            filters.category_residential = true
            break
        case "commercial":
            filters.category_commercial = true
            break
        case "land":
            filters.category_land = true
            break
    }

    filters.subcategory = req.query.subcategory
    switch (filters.subcategory) {
        case "any":
            filters.subcategory_any = true
        case "studio":
            filters.subcategory_studio = true
            break
        case "house":
            filters.subcategory_house = true
            break
        case "complex":
            filters.subcategory_complex = true
            break
        case "maisonette":
            filters.subcategory_maisonette = true
            break
        case "appartment":
            filters.subcategory_appartment = true
            break
        case "penthouse":
            filters.subcategory_penthouse = true
            break
        case "office":
            filters.subcategory_office = true
            break
        case "warehouse":
            filters.subcategory_warehouse = true
            break
        case "industrial":
            filters.subcategory_industrial = true
            break
        case "hotel":
            filters.subcategory_hotel = true
            break
        case "business":
            filters.subcategory_business = true
            break
        case "show_room":
            filters.subcategory_show_room = true
            break
        case "shop":
            filters.subcategory_shop = true
            break
        case "land":
            filters.subcategory_land = true
            break
        case "field":
            filters.subcategory_field = true
            break
        case "island":
            filters.subcategory_island = true
            break
        case "other":
            filters.subcategory_other = true
            break
    }

    filters.location = req.query.location

    let priceStart = Math.abs(Number(req.query.price_start))
    let priceEnd = Math.abs(Number(req.query.price_end))

    filters.price = {
        start: priceStart != NaN ? priceStart : 0,
        end: priceEnd != NaN ? priceEnd : 0
    }

    let areaStart = Math.abs(Number(req.query.area_start))
    let areaEnd = Math.abs(Number(req.query.area_end))

    filters.area = {
        start: areaStart != NaN ? areaStart : 0,
        end: areaEnd != NaN ? areaEnd : 0
    }

    filters.state = req.query.state
    switch (filters.state) {
        case "new":
            filters.state_new = true
            break
        case "renovated":
            filters.state_renovated = true
            break
        case "good":
            filters.state_good = true
            break
        case "old":
            filters.state_old = true
            break
    }

    let roomsFrom = Math.abs(Number(req.query.rooms_from))
    let roomsTo = Math.abs(Number(req.query.rooms_to))

    filters.rooms = {
        start: roomsFrom != NaN ? roomsFrom : 0 ,
        end: roomsTo != NaN ? roomsTo : 0
    }

    let floorFrom = Math.abs(Number(req.query.floor_from))
    let floorTo = Math.abs(Number(req.query.floor_to))

    filters.floor = {
        start: floorFrom != NaN ? floorFrom : 0 ,
        end: floorTo != NaN ? floorTo : 0
    }

    let yearFrom = Math.abs(Number(req.query.year_from))
    let yearTo = Math.abs(Number(req.query.year_to))

    filters.year = {
        start: yearFrom != NaN ? yearFrom : 0 ,
        end: yearTo != NaN ? yearTo : 0
    }

    filters.zone = req.query.zone
    switch (filters.zone) {
        case "residential":
            filters.zone_residential = true
            break
        case "commercial":
            filters.zone_commercial = true
            break
        case "industrial":
            filters.zone_industrial = true
            break
        case "agricultural":
            filters.zone_agricultural = true
            break
        case "forest":
            filters.zone_forest = true
            break
        case "tourist":
            filters.zone_tourist = true
            break
    }

    filters.heating = req.query.heating
    switch (filters.heating) {
        case "autonomous":
            filters.heating_autonomous = true
            break
        case "central":
            filters.heating_central = true
            break
    }

    filters.heating_type = req.query.heating_type
    switch (filters.heating_type) {
        case "oil":
            filters.heating_type_oil = true
            break
        case "gas":
            filters.heating_type_gas = true
            break
        case "wood":
            filters.heating_type_wood = true
            break
        case "electricity":
            filters.heating_type_electricity = true
            break
        case "geothermal":
            filters.heating_type_geothermal = true
            break
        case "solar":
            filters.heating_type_solar = true
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