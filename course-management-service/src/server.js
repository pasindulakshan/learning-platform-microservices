import app from "./app.js";
import logger from "./util/logger.js";
import configs from "./config/index.js";
import connect from "./util/database.connection.js";
import producer from "./config/kafka.js";

const PORT = configs.PORT;
const ENVIRONMENT = configs.ENV;

//Handle Root API Call
app.get("/", (req, res, next) => {
	res.send("<title>University Management System API</title><h2>Welcome to the University Management System API</h2>");
	next();
});

// Start the Server
app.listen(PORT, () => {
	logger.info(`Starting on ${ENVIRONMENT} Environment`);
	connect();
	producer.connect();
	producer.on("ready", () => {
		logger.info("Kafka Producer is connected and ready.");
	});

	producer.on("event.error", (err) => {
		logger.error("Error from producer", err);
	});
	logger.info(`API Server up and running on PORT ${PORT}`);
});
