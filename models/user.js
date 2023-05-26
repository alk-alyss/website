import mongoose from 'mongoose';
const databaseUrl = "mongodb://db/database"

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: {type: String, required: true},
        first_name: {type: String},
        last_name: {type: String},
        phone: {type: Number},
        favoriteListings: {type: Array}
	},
	{
		toObject: {virtuals: true},
		toJSON: {virtuals: true}
	}
);

export const User = mongoose.model("User", userSchema, "Users");

export async function addUser(username, email, password) {
    if (await User.exists({email:email})) return "email"

    if (await User.exists({username:username})) return "username"

    await User.create({
        username:username,
        email:email,
        password:password
    })

    return null
}

export async function getUserByEmail(email) {
    let user = await User.findOne({email:email})

    return user
}

export async function getUserByUsername(username) {
    let user = await User.findOne({username:username})

    if (user)
        return user.toObject()

    return user
}

export async function updateUser(username, first_name="", last_name="", email="", phone="") {
    try {
        let update = {}

        if (first_name != "") update.first_name = first_name
        if (last_name != "") update.first_name = last_name
        if (email != "") update.email = email
        if (phone != "") update.phone = Number.parseInt(phone)

        let result = await User.updateOne({username:username}, update)
    } catch {

    }
}

export async function addFavoriteListing(username, listing) {
    await User.updateOne({username:username}, {$push: {favoriteListings: listing}})
}

export async function removeFavoriteListing(username, listing) {
    await User.updateOne({username:username}, {$pull: {favoriteListings: listing}})
}

export async function importUsers(users) {
	await User.insertMany(users)
}