const mongoose = require('mongoose')
MONGO_URI = "mongodb+srv://d07:NgKER9RLudUYB4T7@cluster1.3yxrtii.mongodb.net/?retryWrites=true&w=majority"
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`MongoDB Connected`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  
  }
}

module.exports = connectDB