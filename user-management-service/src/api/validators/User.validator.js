import { body, param } from "express-validator";

const validateCreateUser = [
	body("name").notEmpty().withMessage("Name is required"),
	body("email").notEmpty().withMessage("Email is required"),
	body("email").isEmail().withMessage("Invalid Email"),
	body("password").notEmpty().withMessage("Password is required"),
	body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
	body("role").notEmpty().withMessage("Role is required"),
	body("role").isIn(["Student", "Instructor"]).withMessage("Role must be either Student or Instructor"),
];

const validateCreateAdminUser = [
	body("name").notEmpty().withMessage("Name is required"),
	body("email").notEmpty().withMessage("Email is required"),
	body("email").isEmail().withMessage("Invalid Email"),
	body("password").notEmpty().withMessage("Password is required"),
	body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
	body("role").notEmpty().withMessage("Role is required"),
	body("role").isIn(["Admin"]).withMessage("Role must be Admin"),
];

const validateGetUserById = [param("id").notEmpty().withMessage("Id is required")];

const validateLoginUser = [
	body("email").notEmpty().withMessage("Email is required"),
	body("email").isEmail().withMessage("Invalid Email"),
	body("password").notEmpty().withMessage("Password is required"),
];

const validateUpdateUserById = [
	param("id").notEmpty().withMessage("Id is required"),
	body("name").notEmpty().withMessage("Name is required"),
	body("email").notEmpty().withMessage("Email is required"),
	body("email").isEmail().withMessage("Invalid Email"),
	body("password").notEmpty().withMessage("Password is required"),
	body("password").isLength({ min: 8 }).withMessage("Password must be at least 6 characters long"),
	body("role").notEmpty().withMessage("Role is required"),
	body("role").isIn(["Student", "Instructor"]).withMessage("Role must be either Student or Instructor"),
];

const UserValidator = {
	validateCreateUser,
	validateCreateAdminUser,
	validateGetUserById,
	validateLoginUser,
	validateUpdateUserById,
};

export default UserValidator;
