import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
	{
		id: {
			type: Schema.Types.ObjectId,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["Admin", "Student", "Instructor"],
			default: "Faculty",
		},
		bio: {
			type: String,
		},
		headline: {
			type: String,
		},
		education: [
			{
				degree: {
					type: String,
				},
				institution: {
					type: String,
				},
				startDate: {
					type: Date,
				},
				endDate: {
					type: Date,
				},
			},
		],
		experience: [
			{
				title: {
					type: String,
				},
				company: {
					type: String,
				},
				startDate: {
					type: Date,
				},
				endDate: {
					type: Date,
				},
			},
		],
		authToken: {
			type: String,
		},
		status: {
			type: String,
			enum: ["Active", "Inactive", "Deleted"],
			default: "Active",
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.pre("save", async function (next) {
	const user = this;
	const password = user.password;

	if (!user.isModified("password")) {
		return next();
	}

	const salt = await bcrypt.genSalt(10);

	const hash = bcrypt.hashSync(password, salt);
	user.password = hash;
	return next();
});

UserSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAuthToken = async function () {
	const user = this;
	const secret = process.env.ACCESS_TOKEN_SECRET;

	const authToken = jwt.sign(
		{
			_id: user._id,
			role: user.role,
		},
		secret,
		{ expiresIn: "30m" }
	);

	user.authToken = authToken;
	await user.save();
	return authToken;
};

UserSchema.methods.invalidateAuthToken = async function () {
	const user = this;
	user.authToken = "";
	await user.save();
};

export default model("User", UserSchema);
