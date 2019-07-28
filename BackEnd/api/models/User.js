const mongoose = require("mongoose");
var Voucher = mongoose.Schema.Types.Voucher;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  region: {
    type: String,
    required: true,
    trim: true
  },
  building: {
    type: Number,
    required: true,
    min: 0
  },
  points: {
    type: Number,
    required: false,
    min: 0
  },
  vouchers: {
    type: [Voucher],
    required: false,
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

mongoose.model("User", userSchema);
