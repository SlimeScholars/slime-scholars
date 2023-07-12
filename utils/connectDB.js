import mongoose from 'mongoose'

const connectDB = async() => mongoose.connect(process.env.MONGO_URI)

export default connectDB
