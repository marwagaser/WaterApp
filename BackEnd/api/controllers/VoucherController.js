var express = require('express');
 
var app = module.exports = express.Router();
 
var Voucher = require('../models/Voucher');
 
// POST
// Create a new Voucher
module.exports.postVoucher= function (req, res) {
  var valid =
		req.body.companyID &&
		Validations.isString(req.body.companyID) &&
		req.body.voucherID &&
		Validations.isString(req.body.voucherID) &&
		req.body.title &&
		Validations.isString(req.body.title) &&
		req.body.offer &&
    Validations.isString(req.body.offer)&&
    req.body.price &&
    Validations.isNumber(req.body.price)&&
    req.body.promocode &&
    Validations.isString(req.body.promocode)&&
    req.body.status &&
    Validations.isString(req.body.status);


    
  if (!valid) {
    return res.status(422).json({
			err: null,
      msg: "You need to fill out all the deatils of the voucher!" ,
    data: null
  });

  }
  
  Voucher.create(req.body, function(err, newVoucher) {
    if (err) {
    
    }

            
    return res.status(201).json({
      err: null,
      msg:
        "Voucher Created!",
      data: req.body
    });

  });	
 

};
 
// GET
// Get all open Vouchers

module.exports.getVouchers = function(req, res, next) {
	Voucher.find({}).exec(function(err, vouchers) {
		if (err) {
			return next(err);
		}
		if (!vouchers) {
			return res
				.status(404)
				.json({ err: null, msg: "Vouchers not found.", data: null });
		}
		res.status(200).json({
			err: null,
			msg: "Vouchers retrieved successfully.",
			data: vouchers
		});
	});
};







// DELETE
// Remove one Voucher by its ID


module.exports.deleteVoucher = function(req, res, next) {
	if (!Validations.isObjectId(req.params.voucherId)) {
		return res.status(422).json({
			err: null,
			msg: "voucherId parameter must be a valid ObjectId.",
			data: null
		});
  }
  findByIdAndRemove(req.params.voucherId).exec(function(
		err,
		deletedVoucher
	) {
		if (err) {
			return next(err);
		}
		if (!deletedVoucher) {
			return res
				.status(404)
				.json({ err: null, msg: "Voucher not found.", data: null });
    }
    res.status(200).json({
      err: null,
      msg: "Voucher was deleted successfully.",
      data: deletedVoucher
    });
  });


};


