var mongoose = require("mongoose"),
  moment = require("moment"),
  Validations = require("../utils/Validations"),
  cloudinary = require("cloudinary"),
  multer = require("multer"),
  cloudinaryStorage = require("multer-storage-cloudinary"),
  path = require("path"),
  WaterMeter = mongoose.model("WaterMeter");
  userCtrl = require("../controllers/UserController");
  pointCtrl = require("../controllers/PointContoller");
var bodyParser = require("body-parser");
const express = require("express");


module.exports.insertReading= function(req,res,next){
    console.log("aywann");
if(req.decodedToken.user.username !== "admin"){
    return res
    .status(401)
    .json({ err: null, msg: "You have no access to that feature", data: null });

};

console.log("ahlan admin");

WaterMeter.create(req.body, function(err, wm) {

    if (err) {
    
    }


    if(wm){
        return res.status(201).json({
        err: null,
        msg:
            "Reading Added",
        data: wm
    });
    }
});	

console.log("raye7 fein");
pointCtrl.calculatePoints(req.body.regionName, req.body.buildingID,req.body.reading);


};
