import app from "./app.js";
import logger from "./util/logger.js";
import EmailService from "./api/services/Email.service.js";
import configs from "./config/index.js";
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
	"group.id": "email-service-group",
	"auto.offset.reset": "earliest",
};

const consumer = new Kafka.KafkaConsumer(kafkaConfig, {});

consumer.connect();

consumer.on("ready", () => {
	logger.info("Consumer connected to Kafka");
	consumer.subscribe(["USER_REGISTERED"]);
	consumer.consume();
});

consumer.on("data", async (data) => {
	const user = JSON.parse(data.value.toString());
	EmailService.sendWelcomeEmail(user);
});

consumer.on("event.error", (error) => {
	logger.error(`Error connecting to Kafka: ${error}`);
});

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
	logger.info(`API Server up and running on PORT ${PORT}`);
});
