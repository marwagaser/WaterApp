
const mongoose = require('mongoose');

const buildingSchema = mongoose.Schema({
  buildingID: {
    type: Number,
    required: true,
   // trim: true,
   // lowercase: true,
    unique:true

  },
  numResidents: {
    type: Number,
    required: true,
    min: 0
  },

  wmid:{
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

 mongoose.model("Building", buildingSchema);


/*const mongoose = require('mongoose');
const buildingSchema = mongoose.Schema({ 
    
    buildingID:{
        type: Number,
        required: true,
        min: 1,
        unique: true

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

mongoose.model('Building',buildingSchema);*/