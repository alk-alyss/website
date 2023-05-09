import mongoose from 'mongoose';
const databaseUrl = "mongodb://db/database"

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

const listingSchema = new mongoose.Schema(
	{
		type: { type: String, required: true },
		location: { type: String, required: true },
		category: {type: String, required: true},
		price: { type: Number, required: true },
		area: { type: Number, required: true },
		extra: { type: Object }
	},
	{
		toObject: {virtuals: true},
		toJSON: {virtuals: true}
	}
);

export const Listing = mongoose.model("Listing", listingSchema, "Listings");

export async function getListings(type="", location="", category="", priceStart=-1, priceEnd=-1, areaStart=-1, areaEnd=-1) {
	let query = { }

	if (type != "") query.type = type
	if (location != "") query.location = new RegExp(location, "i")
	if (category != "") query.category = category

	if (priceEnd != -1) query.price = { $lte: priceEnd }
	if (priceStart != -1) query.price.$gte = priceStart

	if (areaEnd != -1) query.area = { $lte: areaEnd }
	if (areaStart != -1) query.area.$gte = areaStart

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
	}
	catch {
		return null
	}

	let currentListing = await Listing.findById(objectId, "-__v")
	if (currentListing) {
		currentListing = currentListing.toObject()
	}
	return currentListing
}

export async function addListings(listings) {
	await Listing.insertMany(listings)
}