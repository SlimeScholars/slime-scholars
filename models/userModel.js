import { Schema, model, models, mongoose } from 'mongoose'

const userSchema = new Schema(
  {
    // All users have userType and password
    // 1 for students, 2 for parents, 3 for teachers
    // 4 for admin
    userType: {
      type: Number,
      required: [true, 'Missing userType'],
    },
    password: {
      type: String,
      required: [true, 'Missing password'],
    },

    // Only students have username
    username: {
      type: String,
      required: false,
    },
    // All users have firstName and lastName
    firstName: {
      type: String,
      required: [true, 'Missing firstName'],
    },
    lastName: {
      type: String,
      required: [true, 'Missing lastName'],
    },
    // Honorific is optional for parents and teachers
    honorific: {
      type: String,
      required: false,
    },

    // Parents and teachers must have email, students can choose to have email
    email: {
      type: String,
      required: false,
    },
    // Students can have parentId
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },

    // Parents have students
    students: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Missing studentId'],
      }],
      required: false,
      default: undefined,
    },
    // Students and teachers can have classIds
    classes: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: [true, 'Missing classId'],
      }],
      required: false,
      default: undefined,
    },

    // Only students will have everything below
    friends: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Missing friendId'],
      }],
      required: false,
      default: undefined,
    },
    sentFriendRequests: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Missing friendId'],
      }],
      required: false,
      default: undefined,
    },
    receivedFriendRequests: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Missing friendId'],
      }],
      required: false,
      default: undefined,
    },

    completed: {
      type: [{
        lessonId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Lesson',
          required: [true, 'Missing lessonId']
        },
        stars: {
          type: Number,
          required: [true, 'Missing stars']
        },
        looted: {
          type: Boolean,
          required: [true, 'Missing looted'],
        },
      }],
      required: false,
      default: undefined,
    },
    lastRewards: {
      type: [{
        type: Date,
        required: [true, 'Missing rewardTime'],
      }],
      required: false,
      default: undefined,
    },

    slimeGel: {
      type: Number,
      required: false,
    },
    flowers: {
      type: Number,
      required: false,
    },

    slimes: {
      type: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Slime',
          required: [true, 'Missing slimeId'],
      }],
      required: false,
      default: undefined,
    },
    roster: {
      type: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Slime',
          required: false,
        }
      ],
      required: false,
      default: undefined,
    },

    items: {
      type: [{
        itemName: {
          type: String,
          required: [true, 'Missing itemName'],
        },
        rarity: {
          type: String,
          required: [true, 'Missing rarity'],
        },
        quantity: {
          type: Number,
          required: [true, 'Missing quantity'],
        },
        sellPrice: {
          type: Number,
          required: [true, 'Missing sellPrice'],
        },
        sellCurrency: {
          type: Number,
          required: [true, 'Missing sellCurrency'],
        },
      }],
      required: false,
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
)

const User = models.User || model('User', userSchema)

export default User
