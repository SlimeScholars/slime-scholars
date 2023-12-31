import { Schema, model, models, mongoose } from 'mongoose'

const classSchema = new Schema(
  {
    className: {
      type: String,
      required: [true, 'Missing className'],
    },
    classCode: {
      type: String,
      required: [true, 'Missing className'],
      unique: true,
    },
    teachers: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Missing teacherId'],
      }],
      required: [true, 'Missing teachers'],
    },
    students: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Missing studentId'],
      }],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

const Class = models.Class || model('Class', classSchema)

export default Class

