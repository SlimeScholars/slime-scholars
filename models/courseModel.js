import { Schema, model, models, mongoose } from 'mongoose'

const courseSchema = new Schema(
  {
    courseName: {
      type: String,
      default: '',
      required: false,
    },
    latestAuthor: {
      type: String,
      required: [true, 'Missing latestAuthor'],
    },
    units: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: [true, 'Missing unitId'],
      }],
      required: [true, 'Missing units'],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

const Course = models.Course || model('Course', courseSchema)

export default Course

