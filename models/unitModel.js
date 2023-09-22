import { Schema, model, models, mongoose } from 'mongoose'

const unitSchema = new Schema(
  {
    unitNumber: {
      type: Number,
      required: [true, 'Missing unitNumber'],
    },
    unitName: {
      type: String,
      default: '',
      required: false,
    },
    latestAuthor: {
      type: String,
      required: [true, 'Missing latestAuthor'],
    },
    lessons: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: [true, 'Missing lessonId'],
      }],
      required: [true, 'Missing lessons'],
      default: [],
    }
  },
  {
    timestamps: true,
  },
)

const Unit = models.Unit || model('Unit', unitSchema)

export default Unit
