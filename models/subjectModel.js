import { Schema, model, models, mongoose } from "mongoose";

const subjectSchema = new Schema(
  {
    subjectName: {
      type: String,
      default: "",
      required: false,
    },
    latestAuthor: {
      type: String,
      required: [true, "Missing latestAuthor"],
    },
    courses: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: [true, "Missing courseId"],
        },
      ],
      required: [true, "Missing courses"],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Subject = models.Subject || model("Subject", subjectSchema);

export default Subject;
