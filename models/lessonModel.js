import { Schema, model, models, mongoose} from 'mongoose'

const lessonSchema = new Schema(
  {
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
      required: [true, 'Missing activities'],
      default: [],
      _id: false,
    }
  },
  {
    timestamps: true,
  },
)

const Lesson = models.Lesson || model('Lesson', lessonSchema)

export default Lesson

