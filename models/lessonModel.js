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
          index: {
            type: Number,
            required: [true, 'Missing index'],
          },
          sectionType: {
            // 0 for text, 1 for img, 2 for mc, 3 for fill in the blank
            type: Number,
            required: [true, 'Missing sectionType'],
          },
          sectionNumber: {
            type: Number,
            required: [true, 'Missing sectionNumber'],
          },
          text: {
            type: String,
            required: false,
          },
          options: {
            type: [{
              type: {
                option: {
                  type: String,
                  required: [true, 'Missing option'],
                },
                correct: {
                  type: Boolean,
                  required: false, // required: true makes it impossible to store false
                },
              },
              required: [true, 'Missing option']
            }],
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

