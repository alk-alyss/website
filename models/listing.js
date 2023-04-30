import mongoose from 'mongoose';
const databaseUrl = "mongodb://db/database"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
	if (err) { console.log(err) }
});

const db = mongoose.connection;

const listingSchema = new mongoose.Schema({
	type: String,
	location: String,
	price: double,
	area: double
});

const Listing = mongoose.model("Listing", listingSchema, "Listings");