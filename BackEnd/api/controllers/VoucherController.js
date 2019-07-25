var express = require("express");

var app = (module.exports = express.Router());

var Voucher = require("../models/Voucher");

// POST
// Create a new Voucher
module.exports.postVoucher = function(req, res) {
  if (
    !req.body.companyID ||
    !req.body.voucherID ||
    !req.body.title ||
    !req.body.offer ||
    !req.body.price ||
    !req.body.promocode ||
    !req.body.status
  ) {
    return res
      .status(400)
      .send({
        success: false,
        msg: "You need to fill out all the deatils of the offer!"
      });
  }

  Voucher.create(req.body, function(err, newVoucher) {
    if (err) {
    }

    return res.status(201).json({
      err: null,
      msg: "Voucher Created!",
      data: req.body
    });
  });
};

// GET
// Get all open Vouchers

module.exports.getVouchers = function(req, res, next) {
  Voucher.find({}, function(err, offers) {
    if (err) {
      return res.json({
        success: false,
        msg: "Error while creating Offer",
        error: err
      });
    }

    res.status(200).send({ success: true, result: offers });
  });
};

// DELETE
// Remove one Voucher by its ID

module.exports.deleteVoucher = function(req, res, next) {
  var lectionId = req.params.offerId;
  if (!lectionId || lectionId === "") {
    return res.json({
      success: false,
      msg: "You need to send the ID of the Offer",
      error: err
    });
  }

  Offer.findByIdAndRemove(lectionId, function(err, removed) {
    if (err) {
      return res.json({
        success: false,
        msg: "Error while deleting Offer",
        error: err
      });
    }
    res.status(200).json({ success: true, msg: "Offer deleted" });
  });
};
