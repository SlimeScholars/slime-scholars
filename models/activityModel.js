import { Schema, model, models, mongoose } from "mongoose";

const activitySchema = new Schema(
  {
    activityNumber: {
      type: Number,
      required: [true, "Missing unitNumber"],
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
      _id: false,
    },
  },
  {
    timestamps: true,
  }
);

const Activity = models.Activity || model("Activity", activitySchema);

export default Activity;
