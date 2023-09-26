import { Schema, model, models, mongoose } from "mongoose";

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      default: "",
      required: false,
    },
    courseNumber: {
      type: Number,
      required: [true, "Missing courseNumber"],
    },
    latestAuthor: {
      type: String,
      required: [true, "Missing latestAuthor"],
    },
    units: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Unit",
          required: [true, "Missing unitId"],
        },
      ],
      required: [true, "Missing units"],
      default: [],
    },
    quizzes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz",
          required: [true, "Missing quizId"],
        },
      ],
      required: [true, "Missing quizzes"],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Course = models.Course || model("Course", courseSchema);

export default Course;
