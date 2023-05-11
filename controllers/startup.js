import bcrypt from "bcrypt"
import fs from "fs/promises"

import { importListings } from "../models/listing.js"
import { importUsers, getUsers } from "../models/user.js"

export async function loadData() {
	let listingsFile = await fs.readFile("./data/listings.json")
	let listingsJson = JSON.parse(listingsFile)

	await importListings(listingsJson)

	let usersFile = await fs.readFile("./data/users.json")
	let usersJson = JSON.parse(usersFile)

	for (let user of usersJson) {
		let hash = await bcrypt.hash(user.password, 10)
		user.password = hash
	}
	
	await importUsers(usersJson)
}