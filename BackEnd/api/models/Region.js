const mongoose = require('mongoose');
var building =mongoose.Schema.Types.Building;
  
const regionSchema = mongoose.Schema({
  regionName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  
  avConsumption: {
    type: Number,
    required: true
  },

  buildings: {
    type: [building],
   default:[]
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

mongoose.model('Region', regionSchema);
