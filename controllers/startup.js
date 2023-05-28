import bcrypt from "bcrypt"
import fs from "fs/promises"

import { importListings } from "../models/listing.js"
import { getAllIds, importUsers } from "../models/user.js"

export async function loadData() {
	await importListings(JSON.parse(await fs.readFile("./data/residential.json")))
	await importListings(JSON.parse(await fs.readFile("./data/commercial.json")))
	await importListings(JSON.parse(await fs.readFile("./data/land.json")))

	let usersJson = JSON.parse(await fs.readFile("./data/users.json"))

	for (let user of usersJson) {
		let hash = await bcrypt.hash(user.password, 10)
		user.password = hash
	}

	await importUsers(usersJson)

	let userIds = await getAllIds()
}