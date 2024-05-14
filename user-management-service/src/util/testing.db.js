import mongoose from "mongoose";
import logger from "./logger";
import { MongoMemoryServer } from "mongodb-memory-server";

// Connect to Database
export const connect = async () => {
	const mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();
	mongoose.connect(mongoUri);
	logger.info("✅ Connected to MongoDB");
};

// Close Database Connection
export const closeDatabase = async () => {
	await mongoose.connection.close();
	logger.info("❌ Database Closed");
};

// Clear Database
export const clearDatabase = async () => {
	const collections = mongoose.connection.collections;
	for (const key in collections) {
		const collection = collections[key];
		await collection.deleteMany({});
	}
	logger.info("🗑️ Database Cleared");
};
