import { Schema, model, models, mongoose} from 'mongoose'

const lessonSchema = new Schema(
  {
    lessonType:{
      type: String,
      default: 'lesson',
      required: [true, "Missing lesson type (lesson | quiz | test)"]
    },
    lessonNumber: {
      type: Number,
      required: [true, 'Missing unitNumber'],
    },
    lessonName: {
      type: String,
      default: '',
      required: false,
    },
    latestAuthor: {
      type: String,
      required: [true, 'Missing latestAuthor'],
    },

    activities: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
        required: [true, 'Missing activityId'],
      }],
      required: false,
      default: [],
      _id: false,
    },
    problemSet: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Page",
          required: [true, "Missing pageId"],
        },
      ],
      required: false,
      default: [],
      _id: false,
    },
    problemCount: {
      type: Number,
      required: false,
      default: 0,
    },
    starThresholds: {
      type: [Number],
      required: false,
      default: []
    },
  },
  {
    timestamps: true,
  },
)

const Lesson = models.Lesson || model('Lesson', lessonSchema)

export default Lesson

