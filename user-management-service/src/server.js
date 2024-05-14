import app from "./app";
import logger from "./util/logger";
import configs from "./config";
import connect from "./util/database.connection";

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
	logger.info(`API Server up and running on PORT ${PORT}`);
});
