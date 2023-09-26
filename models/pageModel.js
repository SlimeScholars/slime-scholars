import { Schema, model, models, } from 'mongoose'

const pageSchema = new Schema(
    {
      pageNumber: {
        type: Number,
        required: [true, 'Missing unitNumber'],
      },
      sections: {
        type: [sectionSchema],
        required: [true, 'Missing sections'],
        default: [],
        _id: false,
      },
    },
    {
      timestamps: true,
    },
  )

const sectionSchema = new Schema(
    {
        index: {
            type: Number,
            required: [true, 'Missing index']
        },
        elements:{
            type: [elementSchema],
            required: [true, 'Missing elements'],
            default: [],
            _id: false,
        }
    }
)

const elementSchema = new Schema(
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
      isbox: {
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

const Page = models.Activity || model('Page', pageSchema)

export default Page