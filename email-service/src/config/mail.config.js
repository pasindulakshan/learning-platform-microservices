import nodemailer from "nodemailer";

const mailConfigs = () => {
	return nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_CLIENT,
			pass: process.env.EMAIL_CLIENT_PASSWORD,
		},
	});
};

export const mailConfig = {
	mailConfigs,
};
