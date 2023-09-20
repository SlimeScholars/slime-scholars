import { Schema, model, models, } from 'mongoose'

const sectionSchema = new Schema(
  {
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
    explanation: {
      type: String,
      required: false,
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
        required: [true, 'Missing option'],
        _id: false,
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
    explanation: {
      type: String, 
      required: false,
    },
    _id: false,
  },
)

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

    sections: {
      type: [sectionSchema],
      required: [true, 'Missing sections'],
      default: [],
      _id: false,
    },

    quizQuestions: {
      type: [{
        type: [sectionSchema],
        required: [true, 'Missing quizSections'],
        default: [],
        _id: false,
      }],
      required: true,
      default: [[]],
      _id: false
    },
  },
  {
    timestamps: true,
  },
)

const Lesson = models.Lesson || model('Lesson', lessonSchema)

export default Lesson

