const mongoose = require('mongoose');
const BuildingSchema = mongoose.Schema({ 
    
    buildingID:{
        type: Number,
        required: true,
        min: 1
    },
    numResidents:{
        type: Number,
        required: true,
        min:0
    },

    wmid:{
        type: String,
        required: true,
    },

});
  
const regionSchema = mongoose.Schema({
  regionName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true

  },
  regionID: {
    type: Number,
    required: true
    
  },
  avConsumption: {
    type: Number,
    required: true
  },

  buildings: {
    type: [BuildingSchema],
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

mongoose.model('Region', regionSchema);
