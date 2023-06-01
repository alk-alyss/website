import mongoose from 'mongoose';
const databaseUrl = "mongodb://db/database"

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

const listingSchema = new mongoose.Schema(
	{
		type: { type: String, required: true },
		location: { type: String, required: true },
		category: {type: String, required: true},
		subcategory: {type: String, required: true},
		price: { type: Number, required: true },
		area: { type: Number, required: true },
		images: { type: Array },
		floor: { type: Number },
		rooms: { type: Number },
		levels: { type: Number },
		year: { type: Number },
		zone: { type: String },
		heating: { type: String },
		heating_type: { type: String },
		condition: { type: String },
		bathrooms: {type: Number},
		extras: {
			parking: Boolean,
			garden: Boolean,
			balcony: Boolean,
			storage: Boolean,
			fireplace: Boolean,
			elevator: Boolean,
			furnished: Boolean,
			air_condition: Boolean,
			solar_heating: Boolean,
			alarm: Boolean,
			security_door: Boolean,
			pets: Boolean,
			student: Boolean,
			loading_dock: Boolean
		}
	},
	{
		toObject: {virtuals: true},
		toJSON: {virtuals: true}
	}
);

export const Listing = mongoose.model("Listing", listingSchema, "Listings");

export async function getListings(filters={}) {
	let query = {}

	if (filters.type) query.type = filters.type
	if (filters.location) query.location = new RegExp(filters.location, "i")
	if (filters.category) query.category = filters.category
	if (filters.subcategory && filters.subcategory != "any") query.subcategory = filters.subcategory

	query.price = { $gte: filters.price.start }
	if (filters.price.end) query.price.$lte = filters.price.end

	query.area = { $gte: filters.area.start }
	if (filters.area.end) query.area.$lte = filters.area.end

	query.rooms = { $gte: filters.rooms.start }
	if (filters.rooms.end) query.rooms.$lte = filters.rooms.end

	query.floor = { $gte: filters.floor.start }
	if (filters.floor.end) query.floor.$lte = filters.floor.end

	query.year = { $gte: filters.year.start }
	if (filters.year.end) query.year.$lte = filters.year.end

	if (filters.state) query.condition = filters.state
	if (filters.zone) query.zone = filters.zone
	if (filters.heating && filters.heating != "any") query.heating = filters.heating
	if (filters.heating_type && filters.heating_type != "any") query.heating_type = filters.heating_type

	for (const [key, value] of Object.entries(filters.extra)) {
		if (value == false) continue
		query["extras." + key] = value
	}

	let listings = await Listing.find(query, "-__v").exec()

	let listingsArray = []
	if (listings.length > 0) {
		listings.forEach(element => listingsArray.push(element.toObject()));
	}

	return listingsArray
}

export async function getListingById(id) {
	try {
		let objectId = new mongoose.Types.ObjectId(id)
		let currentListing = await Listing.findById(objectId, "-__v")
		if (currentListing) {
			currentListing = currentListing.toObject()
		}
		return currentListing
	}
	catch {
		return null
	}
}

export async function importListings(listings) {
	await Listing.insertMany(listings)
}