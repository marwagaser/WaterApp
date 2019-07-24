var mongoose = require('mongoose');
  
var VoucherSchema = new mongoose.Schema({
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
      color:{
        type: String,
        trim:true,
        default: "Blue is secondary"
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: Date
});
 
VoucherSchema.pre('save', function (next) {
    var voucher = this;
    // get the current date
    var currentDate = new Date();
 
    // if created_at doesn't exist, add to that field
    if (!voucher.created_at) {
        voucher.created_at = currentDate;
    }
    next();
});
 
 
module.exports = mongoose.model('Voucher', VoucherSchema);