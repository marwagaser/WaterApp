const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema({
 companyID: {
    type: Number,
    required: true,
    min: 0
  },
  voucherID: {
    type: Number,
    required: true,
    min: 0
  },
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  offer: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  promocode: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

mongoose.model('Voucher', voucherSchema);
