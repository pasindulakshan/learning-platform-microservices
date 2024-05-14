import User from "../models/User.model";

//Authenticate a user
const authenticateUser = async (email, password) => {
	return await User.findOne({ email, status: "Active" })
		.then(async (user) => {
			if (user && (await user.comparePassword(password))) {
				return user;
			} else {
				throw new Error("Invalid Email or Password!");
			}
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

//Create a new user
const createUser = async (user) => {
	const existingUser = await User.findOne({ email: user.email });
	if (existingUser) {
		throw new Error("Email already exists");
	}

	return await User.create(user)
		.then((user) => {
			return user;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

//Get user by id excluding deleted ones
const getUserById = async (id) => {
	return await User.findOne({ _id: id, status: { $ne: "Deleted" } })
		.then((user) => {
			return user;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

// Get all users excluding deleted ones
const getAllUsers = async () => {
	return await User.find({ status: { $ne: "Deleted" } })
		.then((users) => {
			return users;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

//Update user by id
const updateUserById = async (id, user) => {
	return await User.findByIdAndUpdate(id, user, { new: true })
		.then((user) => {
			return user;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

//Delete user by id
const deleteUserById = async (id) => {
	return await User.findByIdAndUpdate(id, { status: "Deleted" }, { new: true })
		.then((user) => {
			return user;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

const UserService = {
	authenticateUser,
	createUser,
	getUserById,
	getAllUsers,
	updateUserById,
	deleteUserById,
};

export default UserService;
