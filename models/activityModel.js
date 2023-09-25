import { Schema, model, models, mongoose } from "mongoose";

const activitySchema = new Schema(
  {
    activityNumber: {
      type: Number,
      required: [true, "Missing activityNumber"],
    },
    activityName: {
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
    },
  },
  {
    timestamps: true,
  }
);

const Activity = models.Activity || model("Activity", activitySchema);

export default Activity;
