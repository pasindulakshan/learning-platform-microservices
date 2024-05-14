import { Router } from "express";
import { user_auth, admin_auth } from "../middleware/index.js";
import UserController from "../controllers/User.controller.js";
import UserValidator from "../validators/User.validator.js";
import handleValidationErrors from "../../util/validation.handler.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User Management
 *   description: User management endpoints
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided details
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Admin, Faculty, Student]
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Invalid request body or missing required fields
 *       '401':
 *         description: Unauthorized, admin authentication required
 */
router.post("/", UserValidator.validateCreateUser, handleValidationErrors, UserController.createUser);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new admin user
 *     description: Creates a new user with the provided details
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Admin, Faculty, Student]
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Invalid request body or missing required fields
 *       '401':
 *         description: Unauthorized, admin authentication required
 */
router.post(
	"/admin",
	admin_auth,
	UserValidator.validateCreateAdminUser,
	handleValidationErrors,
	UserController.createAdminUser
);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of users retrieved successfully
 *       '401':
 *         description: Unauthorized, admin authentication required
 */
router.get("/", admin_auth, UserController.getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves a user by their ID
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *       '400':
 *         description: Invalid user ID format
 *       '401':
 *         description: Unauthorized, admin authentication required
 *       '404':
 *         description: User not found
 */
router.get("/:id", admin_auth, UserValidator.validateGetUserById, handleValidationErrors, UserController.getUserById);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Updates an existing user's details by their ID
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Admin, Faculty, Student]
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive, Deleted]
 *             required:
 *               - name
 *               - email
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '400':
 *         description: Invalid user ID or request body
 *       '401':
 *         description: Unauthorized, admin authentication required
 */
router.put(
	"/:id",
	admin_auth,
	UserValidator.validateUpdateUserById,
	handleValidationErrors,
	UserController.updateUserById
);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Deletes a user by their ID
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Invalid user ID format
 *       '401':
 *         description: Unauthorized, admin authentication required
 */
router.delete(
	"/:id",
	admin_auth,
	UserValidator.validateGetUserById,
	handleValidationErrors,
	UserController.deleteUserById
);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in user
 *     description: Logs in a user with the provided credentials
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '400':
 *         description: Invalid email or password
 */
router.post("/login", UserValidator.validateLoginUser, handleValidationErrors, UserController.loginUser);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Log out user
 *     description: Logs out the currently authenticated user
 *     tags: [User Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to log out
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User logged out successfully
 */
router.post("/logout/:id", user_auth, UserController.logoutUser);

export default router;
