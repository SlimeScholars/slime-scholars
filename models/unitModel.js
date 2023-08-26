import { Schema, model, models, mongoose } from 'mongoose'

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
        unique: true,
      }],
      required: [true, 'Missing lessons'],
      default: [],
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

const Unit = models.Unit || model('Unit', unitSchema)

export default Unit
