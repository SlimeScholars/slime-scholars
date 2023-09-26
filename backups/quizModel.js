// //TODO: POP QUIZ / UNIT TEST

// //unit -> this -> quiz, test

// import { Schema, model, models, mongoose } from "mongoose";

// const quizSchema = new Schema(
//   {
//     problemSet: {
//       type: [
//         {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Page",
//           required: [true, "Missing pageId"],
//         },
//       ],
//       required: [true, "Missing sections"],
//       default: [],
//       _id: false,
//     },
//     problemCount: {
//       type: Number,
//       required: [true, "Missing problemCount"],
//     },
//     starThresholds: {
//       type: [Number],
//       required: [true, "Missing starThresholds"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Quiz = models.Quiz || model("Quiz", quizSchema);

// export default Quiz;
