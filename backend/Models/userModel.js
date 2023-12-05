const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    empId:{
        type: String,
        required: [true,'Please include empID'],
        unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)