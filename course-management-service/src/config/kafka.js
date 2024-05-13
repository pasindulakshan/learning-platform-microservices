import Kafka from "node-rdkafka";

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

export default producer;
