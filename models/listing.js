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

	if (priceStart != -1 && priceEnd != -1) {
		querry.price = {
			$and: {
				$gt: priceStart,
				$lt: priceEnd,
			}
		}
	} else if (priceEnd == -1) {
		querry.price = {
			$gt: priceStart,
		}
	} else if (priceStart == -1) {
		querry.price = {
			$lt: priceEnd,
		}
	}

	if (areaStart != -1 && areaEnd != -1) {
		querry.price = {
			$and: {
				$gt: areaStart,
				$lt: areaEnd,
			}
		}
	} else if (areaEnd == -1) {
		querry.price = {
			$gt: areaStart,
		}
	} else if (areaStart == -1) {
		querry.price = {
			$lt: areaEnd,
		}
	}

	return await Listing.find(querry).exec()
}