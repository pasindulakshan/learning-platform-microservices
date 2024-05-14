import CourseService from "../services/Course.service.js";
import logger from "../../util/logger.js";

// Create a new course
const createCourse = async (request, response, next) => {
	const course = request.body;

	await CourseService.createCourse(course)
		.then((course) => {
			request.handleResponse.successRespond(response)(course);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

// Get a course by id
const getCourseById = async (request, response, next) => {
	const id = request.params.id;

	await CourseService.getCourseById(id)
		.then((course) => {
			request.handleResponse.successRespond(response)(course);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

// Get all courses
const getAllCourses = async (request, response, next) => {
	await CourseService.getAllCourses()
		.then((courses) => {
			request.handleResponse.successRespond(response)(courses);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

// Get courses by author id
const getCoursesByAuthorId = async (request, response, next) => {
	const authorId = request.params.authorId;

	await CourseService.getCoursesByAuthorId(authorId)
		.then((courses) => {
			request.handleResponse.successRespond(response)(courses);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

// Update a course by id
const updateCourseById = async (request, response, next) => {
	const id = request.params.id;
	const course = request.body;

	await CourseService.updateCourseById(id, course)
		.then((course) => {
			request.handleResponse.successRespond(response)(course);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

// Delete a course by id
const deleteCourseById = async (request, response, next) => {
	const id = request.params.id;

	await CourseService.deleteCourseById(id)
		.then((course) => {
			request.handleResponse.successRespond(response)(course);
		})
		.catch((error) => {
			const errorResponseData = {
				errorTime: new Date(),
				message: error.message,
			};
			logger.error(JSON.stringify(errorResponseData));
			request.handleResponse.errorRespond(response)(errorResponseData);
			next();
		});
};

const CourseController = {
	createCourse,
	getCourseById,
	getAllCourses,
	getCoursesByAuthorId,
	updateCourseById,
	deleteCourseById,
};

export default CourseController;
