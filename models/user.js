import mongoose from 'mongoose';
const databaseUrl = "mongodb://db/database"

mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true },
		password: {type: String, required: true},
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

export async function getPassword(email) {
    let user = User.findOne({email:email})

    if (!user) return null

    return user.password
}

export async function importUsers(users) {
	await User.insertMany(users)
}