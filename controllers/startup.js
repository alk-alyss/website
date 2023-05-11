import * as listings from "../models/listing.js"
import * as users from "../models/user.js"
import fs from "fs/promises"

export async function loadData() {
	let listingsFile = await fs.readFile("./data/listings.json")
	let listingsJson = JSON.parse(listingsFile)

	await listings.importListings(listingsJson)

	let usersFile = await fs.readFile("./data/users.json")
	let usersJson = JSON.parse(usersFile)
	
	await users.importUsers(usersJson)
}