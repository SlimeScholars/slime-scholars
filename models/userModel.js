import { Schema, model, models, mongoose } from "mongoose";

const userSchema = new Schema(
  {
    // All users have userType and password
    // 1 for students, 2 for parents, 3 for teachers
    // 4 for admin
    userType: {
      type: Number,
      required: [true, "Missing userType"],
    },
    password: {
      type: String,
      required: [true, "Missing password"],
    },

    // Only students have username
    username: {
      type: String,
      required: false,
    },
    // All users have firstName and lastName
    firstName: {
      type: String,
      required: [true, "Missing firstName"],
    },
    lastName: {
      type: String,
      required: [true, "Missing lastName"],
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
      ref: "User",
      required: false,
    },

    // Parents have students
    students: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Missing studentId"],
        },
      ],
      required: false,
      default: undefined,
    },
    // Students and teachers can have classIds
    classes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class",
          required: [true, "Missing classId"],
        },
      ],
      required: false,
      default: undefined,
    },

    // Only students will have everything below
    friends: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Missing friendId"],
        },
      ],
      required: false,
      default: undefined,
    },
    sentFriendRequests: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Missing friendId"],
        },
      ],
      required: false,
      default: undefined,
    },
    receivedFriendRequests: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Missing friendId"],
        },
      ],
      required: false,
      default: undefined,
    },
    progress: [
      {
        _id: false,
        courseId: {
          type: String,
          required: [true, "Missing id"],
        },
        units: [
          {
            _id: false,
            unitId: {
              type: String,
              required: [true, "Missing id"],
            },
            lessons: [
              {
                _id: false,
                lessonId: {
                  type: String,
                  required: [true, "Missing id"],
                },
                activities: [
                  {
                    _id: false,
                    activityId: {
                      type: String,
                      required: [true, "Missing id"],
                    },
                    completion: {
                      type: Number,
                      required: [true, "Missing completion"],
                    },
                  },
                ],
                completion: {
                  type: Number,
                  required: [true, "Missing achieved"],
                },
              },
            ],
            quizzes: [
              {
                _id: false,
                quizId: {
                  type: String,
                  required: [true, "Missing id"],
                },
                completion: {
                  type: Number,
                  required: [true, "Missing completion"],
                },
              },
            ],
            tests: [
              {
                _id: false,
                testId: {
                  type: String,
                  required: [true, "Missing id"],
                },
                completion: {
                  type: Number,
                  required: [true, "Missing completion"],
                },
              },
            ],
            completion: {
              type: Number,
              required: [true, "Missing achieved"],
            },
          },
        ],
        completion: {
          type: Number,
          required: [true, "Missing achieved"],
        },
      },
    ],
    lastRewards: {
      type: [
        {
          type: Date,
          required: [true, "Missing rewardTime"],
        },
      ],
      required: false,
      default: undefined,
    },

    lastSlimeRewards: {
      type: Date,
      required: false,
    },

    pfpSlime: {
      type: String,
      required: false,
    },
    pfpBg: {
      type: String,
      required: false,
    },
    bg: {
      type: String,
      required: false,
    },

    slimeGel: {
      type: Number,
      required: false,
    },
    flowers: {
      type: Number,
      required: false,
    },
    exp: {
      type: Number,
      required: false,
    },

    slimes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Slime",
          required: [true, "Missing slimeId"],
        },
      ],
      required: false,
      default: undefined,
    },
    roster: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Slime",
          required: false,
        },
      ],
      required: false,
      default: undefined,
    },

    items: {
      type: [
        {
          itemName: {
            type: String,
            required: [true, "Missing itemName"],
          },
          quantity: {
            type: Number,
            required: [true, "Missing quantity"],
          },
        },
      ],
      required: false,
      default: undefined,
      _id: false,
    },

    tutorialActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

export default User;
