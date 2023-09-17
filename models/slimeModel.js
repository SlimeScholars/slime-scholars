import { Schema, model, models, mongoose } from 'mongoose'

const slimeSchema = Schema(
	{
		// All slimes have these properties
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Missing user'],
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
			required: [true, 'Missing bonusLevel'],
			default: 0,
		},
		maxLevel: {
			type: Number,
			required: [true, 'Missing maxLevel'],
		},
		baseProduction: {
			type: Number,
			required: [true, 'Missing baseProduction'],
		},
		bonusProduction: {
			type: Number,
			required: [true, 'Missing bonusProduction'],
			default: 0,
		},
		// Level up cost set to undefined after reaching max level
		levelUpCost: {
			type: Number,
			required: false,
		},

		// Only starable slimes can have these
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
		// Special effects associated with slime, eg. cannot be leveled, starts with 100 base GP
		effects: {
			type: [String],
			required: false,
			default: undefined,
		},
	},
	{
		timestamps: true,
	},
)

const Slime = models.Slime || model('Slime', slimeSchema)

export default Slime
