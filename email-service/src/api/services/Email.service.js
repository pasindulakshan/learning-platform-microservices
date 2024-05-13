import mailgen from "mailgen";
import { mailConfig } from "../../config/mail.config.js";
import logger from "../../util/logger.js";

const sendWelcomeEmail = async (user) => {
	//import mail configs
	let mailTransporter = mailConfig.mailConfigs();

	// Configure mailgen by setting the theme and sender
	let MailGenerator = new mailgen({
		theme: "cerberus",
		product: {
			name: "Online Learning Platform",
			link: "http://localhost:3000/",
		},
	});

	// Prepare email content
	let email = {
		body: {
			name: user.name,
			intro: "Welcome to the Online Learning Platform! We're very excited to have you on board.",
			action: {
				instructions: "Click the button below to start learning.",
				button: {
					color: "#22BC66",
					text: "View Timetable",
					link: "http://localhost:3000/timetable",
				},
			},
			outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
		},
	};

	// Generate email template
	let emailTemplate = MailGenerator.generate(email);

	// Prepare mail options
	let mailOptions = {
		from: process.env.EMAIL_CLIENT,
		to: user.email,
		subject: "Welcome to the Online Learning Platform",
		html: emailTemplate,
	};

	// Send email
	mailTransporter.sendMail(mailOptions, (err) => {
		if (err) {
			logger.error("Error sending email to " + user.email + " " + err);
		} else {
			logger.info("Email sent to " + user.email);
		}
	});
};

const EmailService = {
	sendWelcomeEmail,
};

export default EmailService;
