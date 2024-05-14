import mongoose from "mongoose";
import logger from "./logger";
import configs from "../config";

let database;

const connect = async () => {
	const databaseConnectionString = configs.DB_CONNECTION_STRING;

	if (database) {
		return;
	}

	mongoose
		.connect(databaseConnectionString)
		.then((connection) => {
			database = connection.connection;
			logger.info("Database Synced");
		})
		.catch((error) => {
			logger.error("Error connecting to database: ", error.message);
		});
};

export default connect;
