import { Router } from "express";
import { user_auth, instructor_auth } from "../middleware/index.js";
import CourseController from "../controllers/Course.controller.js";
import CourseValidator from "../validators/Course.validator.js";
import handleValidationErrors from "../../util/validation.handler.js";

const router = Router();

router.post(
	"/",
	instructor_auth,
	CourseValidator.validateCreateCourse,
	handleValidationErrors,
	CourseController.createCourse
);

router.get(
	"/:id",
	user_auth,
	CourseValidator.validateGetCourseById,
	handleValidationErrors,
	CourseController.getCourseById
);

router.get("/", user_auth, CourseController.getAllCourses);

router.get(
	"/author/:authorId",
	user_auth,
	CourseValidator.validateGetCoursesByAuthorId,
	handleValidationErrors,
	CourseController.getCoursesByAuthorId
);

router.patch(
	"/:id",
	instructor_auth,
	CourseValidator.validateUpdateCourse,
	handleValidationErrors,
	CourseController.updateCourseById
);

router.delete(
	"/:id",
	instructor_auth,
	CourseValidator.validateDeleteCourseById,
	handleValidationErrors,
	CourseController.deleteCourseById
);

export default router;
