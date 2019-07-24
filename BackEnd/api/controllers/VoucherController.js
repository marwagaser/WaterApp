var express = require('express');
 
var app = module.exports = express.Router();
 
var Voucher = require('../models/voucher');
 
// POST
// Create a new Voucher
app.post('/vouchers', function (req, res) {
  if (!req.body.companyID||!req.body.voucherID||!req.body.title||!req.body.offer||!req.body.price||!req.body.promocode||!req.body.status) {
    return res.status(400).send({ "success": false, "msg": "You need to fill out all the deatils of the voucher!" });
  }
 
  var newVoucher = new Voucher({
    companyID: req.body.companyID,
    voucherID: req.body.voucherID,
    title: req.body.title,
    offer: req.body.offer,
    price: req.body.price,
    promocode: req.body.promocode,
    status: req.body.status,
    color: req.body.color
  });
 
  newVoucher.save(function (err) {
    if (err) {
      console.log("some error: ", err);
      return res.json({ "success": false, "msg": "Error while creating Voucher", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new Voucher.' });
  });
});
 
// GET
// Get all open Vouchers
app.get('/vouchers', function (req, res) {
  Voucher.find({}, function (err, Vouchers) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while creating Voucher", "error": err });
    }
 
    res.status(200).send({ "success": true, "result": Vouchers });
  });
});
 
// DELETE
// Remove one Voucher by its ID
app.delete('/vouchers/:voucherId', function (req, res) {
  var lectionId = req.params.voucherId;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the Voucher", "error": err });
  }
 
  Voucher.findByIdAndRemove(lectionId, function (err, removed) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while deleting Voucher", "error": err });
    }
    res.status(200).json({ "success": true, "msg": "Voucher deleted" });
  });
});