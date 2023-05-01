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

export async function getListings(type, location, category, priceStart=-1, priceEnd=-1, areaStart=-1, areaEnd=-1) {
	let querry = {
		type: type,
		location: location,
		category: category,
	}

	if (priceEnd != -1) {
		querry.price = {
			$lte: priceEnd
		}
	}
	if (priceStart != -1) {
		querry.price.$gte = priceStart
	}

	if (areaEnd != -1) {
		querry.area = {
			$lte: areaEnd
		}
	}
	if (areaStart != -1) {
		querry.area.$gte = areaStart
	}

	console.log(querry)
	return await Listing.find(querry, "-_id -__v").exec()
}