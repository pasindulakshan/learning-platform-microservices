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
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		categories: {
			type: [String],
			required: true,
		},
		lessons: [
			{
				title: {
					type: String,
					required: true,
				},
				description: {
					type: String,
					required: true,
				},
				contentUrl: {
					type: String,
					required: true,
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
			required: true,
		},
		status: {
			type: String,
			enum: ["Active", "Inactive", "Deleted"],
			default: "Active",
		},
	},
	{
		timestamps: true,
	}
);

export default model("Course", CourseSchema);
