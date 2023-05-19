import mongoose from 'mongoose';
const databaseUrl = "mongodb://db/database"

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: {type: String, required: true},
        name: {type: String},
        surname: {type: String},
        phone: {type: String}
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

    return user.toObject()
}

export async function getUserByUsername(username) {
    let user = await User.findOne({username:username})

    return user.toObject()
}

export async function updateUser(username, name="", surname="", email="", phone="") {
    let update = {}

    if (name != "") update.name = name
    if (surname != "") update.surname = surname
    if (email != "") update.email = email
    if (phone != "") update.phone = phone

    let result = await User.updateOne({username:username}, update)
}

export async function importUsers(users) {
	await User.insertMany(users)
}