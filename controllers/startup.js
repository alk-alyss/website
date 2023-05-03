import * as listings from "../models/listing.js"
import fs from "fs/promises"

export async function loadData() {
	let listingsFile = await fs.readFile("./listings.json")
	let listingsJson = JSON.parse(listingsFile)

	await listings.addListings(listingsJson)
}