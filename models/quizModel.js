//TODO: POP QUIZ / UNIT TEST

//unit -> this -> quiz, test

import { Schema, model, models, mongoose } from "mongoose";

const quizSchema = new Schema(
  {
    quizNumber: {
      type: Number,
      required: [true, "Missing unitNumber"],
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
      required: [true, "Missing pages"],
      default: [],
      _id: false,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = models.Quiz || model("Quiz", quizSchema);

export default Quiz;
