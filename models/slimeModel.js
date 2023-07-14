import { Schema, model, models, mongoose } from 'mongoose'

const slimeSchema = Schema(
  {
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Missing userId'],
		},
		slimeName: {
			type: String,
			required: [true, 'Missing slimeName'],
		},
		rarity: {
			type: String,
			required: [true, 'Missing rarity'],
		},
		level: {
			type: Number,
			required: [true, 'Missing level'],
			default: 1,
		},
    bonusLevel: {
      type: Number,
      required: [true, 'Missing maxLevel'],
      default: 0,
    },
		maxLevel: {
			type: Number,
			required: [true, 'Missing maxLevel'],
		},
    starLevel: {
      type: Number,
      required: false,
    },
    maxStarLevel: {
      type: Number,
      required: false
    },
    starProgress: {
      type: Number,
      required: false,
    },
    maxStarProgress: {
      type: Number,
      required: false,
    },
		basePower: {
			type: Number,
			required: [true, 'Missing basePower'],
		},
		levelUpCost: {
			type: Number,
			required: [true, 'Missing levelUpCost'],
		},
  },
  {
    timestamps: true,
  },
)

const Slime = models.Slime || model('Slime', slimeSchema)

export default Slime
