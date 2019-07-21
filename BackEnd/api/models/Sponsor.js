const mongoose = require('mongoose');

const sponsorSchema = mongoose.Schema({
    companyID: {
    type: Number,
    required: true,
    min: 0
    },

    companyName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  sector: {
    type: String,
    required: true,
    
  },
  business: {
    type: String,
    required: true,
    
  },
  description: {
    type: String,
    
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

mongoose.model('Sponsor', sponsorSchema);
