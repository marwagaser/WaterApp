const mongoose = require('mongoose');

const waterMeterSchema = mongoose.Schema({
  wmid: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique:false

  },
  reading: {
    type: Number,
    required: true,
    min: 0
  },
  readingDate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: Date
});

mongoose.model('WaterMeter', waterMeterSchema);
