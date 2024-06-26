import UserService from "../services/User.service.js";
import logger from "../../util/logger.js";
import Kafka from "node-rdkafka";
import dotenv from "dotenv";
dotenv.config();

const kafkaConfig = {
	"metadata.broker.list": process.env.KAFKA_BOOTSTRAP_SERVERS,
	"security.protocol": process.env.KAFKA_SECURITY_PROTOCOL,
	"sasl.mechanisms": process.env.KAFKA_SASL_MECHANISMS,
	"sasl.username": process.env.KAFKA_SASL_USERNAME,
	"sasl.password": process.env.KAFKA_SASL_PASSWORD,
	"session.timeout.ms": process.env.KAFKA_SESSION_TIMEOUT_MS,
	dr_cb: true,
};

const producer = new Kafka.Producer(kafkaConfig);
producer.connect();
producer.on("ready", () => {
	logger.info("Producer connected to Kafka");
});
producer.on("event.error", (error) => {
	logger.error(`Error connecting to Kafka: ${error}`);
});

const sendUserRegisteredEvent = (user) => {
	producer.produce(
		"USER_REGISTERED",
		-1,
		Buffer.from(JSON.stringify(user)),
		Buffer.from("UserRegisteredKey"),
		Date.now()
	);
};

// User login
const loginUser = async (request, response, next) => {
	const { email, password } = request.body;

	if (email && password) {
		await UserService.authenticateUser(email, password)
			.then(async (user) => {
				const authToken = await user.generateAuthToken();

				const data = {
					_id: user._id,
					name: user.name,
					email: user.email,
					token: authToken,
					role: user.role,
				};

				request.handleResponse.successRespond(response)(data);
			})
			.catch((error) => {
				const errorResponseData = {
					errorTime: new Date(),
					message: error.message,
				};
				logger.error(JSON.stringify(errorResponseData));
				request.handleResponse.errorRespond(response)(errorResponseData);
				next();
			});
	} else {
		logger.error("Email or Password is missing");
		request.handleResponse.errorRespond(response)("Invalid Email or Password!");
		next();
	}
};

// User logout
const logoutUser = async (request, response, next) => {
	const userId = request.params.id;
	await UserService.getUserById(userId)
		.then(async (user) => {
			await user.invalidateAuthToken();
			request.handleResponse.successRespond(response)("User logged out successfully!");
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

// Create a new user
const createUser = async (request, response, next) => {
	const user = request.body;

	await UserService.createUser(user)
		.then((user) => {
			const data = {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			};
			sendUserRegisteredEvent(data);
			request.handleResponse.successRespond(response)(data);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

// Create admin user
const createAdminUser = async (request, response, next) => {
	const user = request.body;

	await UserService.createUser(user)
		.then((user) => {
			const data = {
				_id: user._id,
				email: user.email,
				role: user.role,
			};
			request.handleResponse.successRespond(response)(data);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

// Get all users
const getAllUsers = async (request, response, next) => {
	await UserService.getAllUsers()
		.then((users) => {
			const data = users.map((user) => {
				return {
					_id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,
					bio: user.bio || "",
					headline: user.headline || "",
					education: user.education || [],
					experience: user.experience || [],
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				};
			});
			request.handleResponse.successRespond(response)(data);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

// Get user by id
const getUserById = async (request, response, next) => {
	const userId = request.params.id;

	await UserService.getUserById(userId)
		.then((user) => {
			const data = {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				bio: user.bio || "",
				headline: user.headline || "",
				education: user.education || [],
				experience: user.experience || [],
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			};
			request.handleResponse.successRespond(response)(data);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

// Update user by id
const updateUserById = async (request, response, next) => {
	const userId = request.params.id;
	const user = request.body;

	await UserService.updateUserById(userId, user)
		.then((user) => {
			const data = {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				bio: user.bio || "",
				headline: user.headline || "",
				education: user.education || [],
				experience: user.experience || [],
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			};
			request.handleResponse.successRespond(response)(data);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

// Delete user by id
const deleteUserById = async (request, response, next) => {
	const userId = request.params.id;

	await UserService.deleteUserById(userId)
		.then((user) => {
			const data = {
				_id: user._id,
				email: user.email,
				role: user.role,
				status: user.status,
			};
			request.handleResponse.successRespond(response)(data);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

const UserController = {
	loginUser,
	logoutUser,
	createUser,
	createAdminUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
};

export default UserController;
