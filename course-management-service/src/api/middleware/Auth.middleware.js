import jwt from "jsonwebtoken";
import logger from "../../util/logger.js";

const verifyAuthToken = async (authToken) => {
	const secret = process.env.ACCESS_TOKEN_SECRET;
	if (!secret) {
		throw new Error("Token Secret is not found");
	}
	const decoded = jwt.verify(authToken, secret);
	return decoded;
};

export const user_auth = async (request, response, next) => {
	try {
		if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer")) {
			response.status(401);
			throw new Error("Not authorized, no token");
		}

		const authToken = request.headers.authorization.split(" ")[1];
		const decoded = await verifyAuthToken(authToken);

		if (decoded.role !== "Admin" && decoded.role !== "Instructor" && decoded.role !== "Student") {
			throw new Error("Do not have permission to access this resource");
		}

		request.authToken = authToken;
		request.user = decoded;

		logger.info(`Authentication Token for ID ${decoded._id} is Accepted`);
		next();
	} catch (error) {
		logger.warn(error.message);
		return request.handleResponse.unauthorizedRespond(response)(error.message);
	}
};

export const admin_auth = async (request, response, next) => {
	try {
		if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer")) {
			response.status(401);
			throw new Error("Not authorized, no token");
		}

		const authToken = request.headers.authorization.split(" ")[1];
		const decoded = await verifyAuthToken(authToken);

		if (decoded.role !== "Admin") {
			throw new Error("Do not have permission to access this resource");
		}

		request.authToken = authToken;
		request.user = decoded;

		logger.info(`Authentication Token for ID ${decoded._id} is Accepted`);
		next();
	} catch (error) {
		logger.warn(error.message);
		return request.handleResponse.unauthorizedRespond(response)(error.message);
	}
};

export const instructor_auth = async (request, response, next) => {
	try {
		if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer")) {
			response.status(401);
			throw new Error("Not authorized, no token");
		}

		const authToken = request.headers.authorization.split(" ")[1];
		const decoded = await verifyAuthToken(authToken);

		if (decoded.role !== "Instructor" && decoded.role !== "Admin") {
			throw new Error("Do not have permission to access this resource");
		}

		request.authToken = authToken;
		request.user = decoded;

		logger.info(`Authentication Token for ID ${decoded._id} is Accepted`);
		next();
	} catch (error) {
		logger.warn(error.message);
		return request.handleResponse.unauthorizedRespond(response)(error.message);
	}
};

export const student_auth = async (request, response, next) => {
	try {
		if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer")) {
			response.status(401);
			throw new Error("Not authorized, no token");
		}

		const authToken = request.headers.authorization.split(" ")[1];
		const decoded = await verifyAuthToken(authToken);

		if (decoded.role !== "Student" && decoded.role !== "Admin") {
			throw new Error("Do not have permission to access this resource");
		}

		request.authToken = authToken;
		request.user = decoded;

		logger.info(`Authentication Token for ID ${decoded._id} is Accepted`);
		next();
	} catch (error) {
		logger.warn(error.message);
		return request.handleResponse.unauthorizedRespond(response)(error.message);
	}
};
