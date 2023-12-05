const mongoose = require('mongoose');

const foodSchema = mongoose.Schema(
  {
    user:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref: 'User'
    },
    date: {
      type: Date,
      required: [true, 'Please add a date'],
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
      enum: ['Chennai', 'Coimbatore', 'Erode'],
    },
    mealTypes: {
      breakfast: {
        type: Boolean,
        default: false,
      },
      lunch: {
        type: Boolean,
        default: false,
      },
      dinner: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Food', foodSchema);
