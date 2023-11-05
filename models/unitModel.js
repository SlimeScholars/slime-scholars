import { Schema, model, models, mongoose } from "mongoose";

const unitSchema = new Schema(
  {
    unitNumber: {
      type: Number,
      required: [true, "Missing unitNumber"],
    },
    unitName: {
      type: String,
      default: "",
      required: false,
    },
    latestAuthor: {
      type: String,
      required: [true, "Missing latestAuthor"],
    },
    totalPoints: {
      type: Number,
      required: [true, "Missing totalPoints"],
    },
    completed: {
      type: {
        lessons: {
          type: Number,
          required: [true, "Missing completed lessons"],
        },
        quizzes: {
          type: Number,
          required: [true, "Missing completed quizzes"],
        },
        tests: {
          type: Number,
          required: [true, "Missing completed tests"],
        },
      },
      required: [true, "Missing completed"],
      default: {
        lessons: 0,
        quizzes: 0,
        tests: 0,
      },
    },
    lessons: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson",
          required: [true, "Missing lessonId"],
        },
      ],
      required: [true, "Missing lessons"],
      default: [],
    },
    // quizzes: {
    //   type: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Lesson",
    //       required: [true, "Missing quizId"],
    //     },
    //   ],
    //   required: [true, "Missing quizzes"],
    //   default: [],
    // },
    // tests: {
    //   type: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Lesson",
    //       required: [true, "Missing testId"],
    //     },
    //   ],
    //   required: [true, "Missing tests"],
    //   default: [],
    // },
    totalPoints: {
      type: Number,
      required: [true, "Missing totalPoints"],
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Unit = models.Unit || model("Unit", unitSchema);

export default Unit;
