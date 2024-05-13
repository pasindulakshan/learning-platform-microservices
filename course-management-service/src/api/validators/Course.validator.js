import { body, param } from "express-validator";

const validateCreateCourse = [
	body("name").notEmpty().withMessage("Name is required"),
	body("author").notEmpty().withMessage("Author Id is required"),
	body("author").isMongoId().withMessage("Author Id must be a valid Mongo Id"),
];

const validateUpdateCourse = [param("id").isMongoId().withMessage("Id must be a valid Mongo Id")];

const validateGetCourseById = [param("id").notEmpty().withMessage("Id is required")];

const validateGetCoursesByAuthorId = [param("authorId").notEmpty().withMessage("Author Id is required")];

const validateDeleteCourseById = [param("id").notEmpty().withMessage("Id is required")];

const CourseValidator = {
	validateCreateCourse,
	validateUpdateCourse,
	validateGetCourseById,
	validateGetCoursesByAuthorId,
	validateDeleteCourseById,
};

export default CourseValidator;
