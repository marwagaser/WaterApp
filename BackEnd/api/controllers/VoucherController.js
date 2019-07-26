var express = require('express');
const mongoose = require('mongoose');
var app = module.exports = express.Router();
var Voucher = require('../models/Voucher');
// POST
// Create a new Voucher
module.exports.postVoucher= function (req, res) {
 
    if (!req.body.companyID||!req.body.voucherID||!req.body.title||!req.body.offer||!req.body.price||!req.body.promocode||!req.body.status) {
   return res.status(400).send({ "success": false, "msg": "You need to fill out all the deatils of the offer!" });
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
    Voucher.find({}, function (err, offers) {
   if (err) {
     return res.json({ "success": false, "msg": "Error while creating Offer", "error": err });
   }
   res.status(200).send({ "success": true, "result": offers });
 });
};
 
 
// DELETE
// Remove one Voucher by its ID
 
 
 
 
 
 
 
app.deleteVoucher = function(req, res, next) {
 
var str = req.params._id;
var mongoObjectId = mongoose.Types.ObjectId(str);
 Voucher.findByIdAndRemove(mongoObjectId)
 .then(Voucher => {
     if(!Voucher) {
         return res.status(404).send({
             message: "1 Voucher not found with the id " + mongoObjectId
         });
     }
     res.send({message: "2 Voucher deleted successfully!"});
 }).catch(err => {
     if(err.kind === 'ObjectId' || err.name === 'NotFound') {
         return res.status(404).send({
             message: "3 Voucher not found with id " + mongoObjectId
         });               
     }
     return res.status(500).send({
         message: "4 Could not delete Voucher with id " + mongoObjectId
     });
 });
    
    };


    app.findVoucher = function(req, res, next) {
 
        var str = req.params._id;
        var mongoObjectId = mongoose.Types.ObjectId(str);
        Voucher.findOne(mongoObjectId, function (err,doc) {
            if (err) {
              return res.json({ "success": false, "msg": "Error while finding Offer", "error": err });
            }
            res.send(doc);
          });
            
            };
    