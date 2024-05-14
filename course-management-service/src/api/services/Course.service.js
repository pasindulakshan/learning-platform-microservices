import Course from "../models/Course.model.js";

const createCourse = async (course) => {
	return await Course.create(course)
		.then((course) => {
			return course;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

const getCourseById = async (id) => {
	return await Course.findOne({ _id: id, status: { $ne: "Deleted" } })
		.then((course) => {
			return course;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

const getAllCourses = async () => {
	return await Course.find({ status: { $ne: "Deleted" } })
		.then((courses) => {
			return courses;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

const getCoursesByAuthorId = async (authorId) => {
	return await Course.find({ author: authorId, status: { $ne: "Deleted" } })
		.then((courses) => {
			return courses;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

const updateCourseById = async (id, course) => {
	return await Course.findByIdAndUpdate(id, course, { new: true })
		.then((course) => {
			return course;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

const deleteCourseById = async (id) => {
	return await Course.findByIdAndUpdate(id, { status: "Deleted" }, { new: true })
		.then((course) => {
			return course;
		})
		.catch((error) => {
			throw new Error(error.message);
		});
};

const CourseService = {
	createCourse,
	getCourseById,
	getAllCourses,
	getCoursesByAuthorId,
	updateCourseById,
	deleteCourseById,
};

export default CourseService;
