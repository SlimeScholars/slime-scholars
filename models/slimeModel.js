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
		maxLevel: {
			type: Number,
			required: [true, 'Missing maxLevel'],
		},
		sellPrice: {
			type: Number,
			required: [true, 'Missing sellPrice'],
		},
		sellCurrency: {
			type: Number,
			required: [true, 'Missing sellCurrency'],
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
