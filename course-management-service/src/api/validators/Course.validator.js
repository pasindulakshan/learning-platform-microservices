import { body, param } from "express-validator";

const validateCreateCourse = [
	body("name").notEmpty().withMessage("Name is required"),
	body("description").notEmpty().withMessage("Description is required"),
	body("authorId").notEmpty().withMessage("Author Id is required"),
	body("authorId").isMongoId().withMessage("Author Id must be a valid Mongo Id"),
	body("categories").notEmpty().withMessage("Categories is required"),
	body("lessons").isArray().withMessage("Lessons must be an array"),
	body("lessons.*.title").notEmpty().withMessage("Lesson title is required"),
	body("lessons.*.description").notEmpty().withMessage("Lesson description is required"),
	body("lessons.*.contentUrl").notEmpty().withMessage("Lesson content url is required"),
	body("lessons.*.contentType").notEmpty().withMessage("Lesson content type is required"),
	body("lessons.*.contentType")
		.isIn(["Video", "Image"])
		.withMessage("Lesson content type must be either Video or Image"),
	body("price").notEmpty().withMessage("Price is required"),
];

const validateUpdateCourse = [
	param("id").notEmpty().withMessage("Id is required"),
	param("id").isMongoId().withMessage("Id must be a valid Mongo Id"),
	body("name").notEmpty().withMessage("Name is required"),
	body("description").notEmpty().withMessage("Description is required"),
	body("authorId").notEmpty().withMessage("Author Id is required"),
	body("authorId").isMongoId().withMessage("Author Id must be a valid Mongo Id"),
	body("categories").notEmpty().withMessage("Categories is required"),
	body("lessons").isArray().withMessage("Lessons must be an array"),
	body("lessons.*.title").notEmpty().withMessage("Lesson title is required"),
	body("lessons.*.description").notEmpty().withMessage("Lesson description is required"),
	body("lessons.*.contentUrl").notEmpty().withMessage("Lesson content url is required"),
	body("lessons.*.contentType").notEmpty().withMessage("Lesson content type is required"),
	body("lessons.*.contentType")
		.isIn(["Video", "Image"])
		.withMessage("Lesson content type must be either Video or Image"),
	body("price").notEmpty().withMessage("Price is required"),
];

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
