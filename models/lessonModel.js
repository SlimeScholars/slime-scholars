import { Schema, model, models, mongoose } from 'mongoose'

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
    // TODO: Sections
    sections: {
      type: [{
        type: {
          sectionType: {
            type: Number,
            required: [true, 'Missing sectionType']
          },
        },
        required: [true, 'Missing section'],
      }],
      required: [true, 'Missing sections'],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

const Lesson = models.Lesson || model('Lesson', lessonSchema)

export default Lesson

