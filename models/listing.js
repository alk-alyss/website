import { query } from 'express';
import mongoose from 'mongoose';
const databaseUrl = "mongodb://db/database"

let uri = "mongodb://db/website"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

const listingSchema = new mongoose.Schema({
	type: { type: String, required: true },
	location: { type: String, required: true },
	category: {type: String, required: true},
	price: { type: Number, required: true },
	area: { type: Number, required: true },
	extra: { type: Object }
});

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

	console.log(query)
	return await Listing.find(query, "-__v").exec()
}

export async function addListings(listings) {
	await Listing.insertMany(listings)
}