//TODO: POP QUIZ / UNIT TEST

//unit -> this -> quiz, test

import { Schema, model, models, mongoose } from "mongoose";

const quizSchema = new Schema(
  {
    // may be needed (version A, version B, etc.)
    quizNumber: {
      type: Number,
      required: [true, "Missing quizNumber"],
    },
    quizName: {
      type: String,
      default: "",
      required: false,
    },
    latestAuthor: {
      type: String,
      required: [true, "Missing latestAuthor"],
    },
    pages: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Page",
          required: [true, "Missing pageId"],
        },
      ],
      required: [true, "Missing sections"],
      default: [],
      _id: false,
    },
    passingScore: {
      type: Number,
      required: [true, "Missing passingScore"],
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = models.Quiz || model("Quiz", quizSchema);

export default Quiz;
