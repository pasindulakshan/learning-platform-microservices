import { model, Schema } from "mongoose";

const CourseSchema = new Schema(
	{
		id: {
			type: Schema.Types.ObjectId,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		author: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		category: {
			type: String,
		},
		lessons: [
			{
				title: {
					type: String,
				},
				description: {
					type: String,
				},
				contentUrl: {
					type: String,
				},
				contentType: {
					type: String,
					enum: ["Video", "Image"],
					default: "Video",
				},
				contentStatus: {
					type: String,
					enum: ["Active", "Broken", "Deleted"],
					default: "Active",
				},
			},
		],
		price: {
			type: Number,
		},
		status: {
			type: String,
			enum: ["Active", "Inactive", "Deleted"],
			default: "Active",
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export default model("Course", CourseSchema);
