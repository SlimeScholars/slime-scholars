import { Schema, model, models, mongoose } from "mongoose";

const elementSchema = new Schema(
  {
    index: {
      type: Number,
      required: [true, "Missing index"],
    },
    elementType: {
      // 0 for text, 1 for img, 2 for mc, 3 for fill in the blank
      type: Number,
      required: [true, "Missing sectionType"],
    },
    isBox: {
      type: Boolean,
      required: false,
      default: false,
    },
    text: {
      type: String,
      required: false,
    },
    image: {
      type: String, // URL of image
      required: false,
    },
    options: {
      type: [
        {
          type: {
            option: {
              type: String,
              required: [true, "Missing option"],
            },
            correct: {
              type: Boolean,
              required: false, // required: true makes it impossible to store false
            },
          },
          required: [true, "Missing option"],
          _id: false,
        },
      ],
      required: false,
      default: undefined,
    },
    blank: {
      type: [String],
      required: false,
      default: undefined,
    },
    afterBlank: {
      type: String,
      required: false,
    },
    explanation: {
      type: String,
      required: false,
    },
    // for images
    // 0, 1, 2 (how rounded the corners are)
    rounded: {
      type: Number,
      required: false,
    },
    // 0, 1, 2 (0 for small, 1 for medium, 2 for large)
    size: {
      type: Number,
      required: false,
    },
    border: {
      type: Boolean,
      required: false,
    },
    _id: false,
  },
  {
    timestamps: true,
  }
);

const sectionSchema = new Schema(
  {
    sectionIndex: {
      type: Number,
      required: [true, "Missing index"],
    },
    sectionStyle: {
      type: String,
      required: [true, "Missing style, choose plain or bold"],
    },
    sectionDirection: {
      type: String,
      required: [true, "Missing direction, choose horizontal or vertical"],
    },
    elements: {
      type: [elementSchema],
      required: [true, "Missing elements"],
      default: [],
      _id: false,
    },
  },
  {
    timestamps: true,
  }
);

const pageSchema = new Schema(
  {
    pageNumber: {
      type: Number,
      required: [true, "Missing pageNumber"],
    },
    sections: {
      type: [sectionSchema],
      required: [true, "Missing sections"],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const lessonSchema = new Schema(
  {
    lessonType: {
      type: String,
      default: "lesson",
      required: [true, "Missing lesson type (lesson | quiz | test)"],
    },
    lessonNumber: {
      type: Number,
      required: [true, "Missing unitNumber"],
    },
    lessonName: {
      type: String,
      default: "",
      required: false,
    },
    latestAuthor: {
      type: String,
      required: [true, "Missing latestAuthor"],
    },
    activities: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Activity",
          required: [true, "Missing activityId"],
        },
      ],
      required: false,
      default: [],
      _id: false,
    },
    problemSet: {
      type: [pageSchema],
      required: [true, "Missing pages"],
      default: [],
    },
    problemCount: {
      type: Number,
      required: false,
      default: 0,
    },
    starThresholds: {
      type: [Number],
      required: false,
      default: [],
    },
    totalPoints: {
      type: Number,
      required: [true, "Missing totalPoints"],
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = models.Lesson || model("Lesson", lessonSchema);

export default Lesson;
