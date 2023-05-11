import { importListings } from "../models/listing.js"
import { importUsers } from "../models/user.js"
import fs from "fs/promises"

export async function loadData() {
	let listingsFile = await fs.readFile("./data/listings.json")
	let listingsJson = JSON.parse(listingsFile)

	await importListings(listingsJson)

	let usersFile = await fs.readFile("./data/users.json")
	let usersJson = JSON.parse(usersFile)
	
	await importUsers(usersJson)
}