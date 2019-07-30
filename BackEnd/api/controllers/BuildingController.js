var mongoose = require("mongoose"),
  moment = require("moment"),
  Validations = require("../utils/Validations"),
  cloudinary = require("cloudinary"),
  multer = require("multer"),
  cloudinaryStorage = require("multer-storage-cloudinary"),
  path = require("path"),
  Building = mongoose.model("Building");
var bodyParser = require("body-parser");
const express = require("express");


module.exports.createBuilding= function(req,res,next){
    console.log("aywann");
    Building.create(req.body, function(err, build) {
        if (err) {
        return next(err);
        }
    
    
        if(build){
            return res.status(201).json({
            err: null,
            msg:
                "Building Created",
            data: build
        });
        }
    });	
}

module.exports.getResidents = function(req,res,next){
console.log("buildkiebvi");
    Building.findOne({buildingID: req.body.buildingID},function(err,building){

        if(err){
            return next(err);
        }
        if(!building){

            return res.status(404).json({
                err:null,
                msg: "Building not found",
                data: null
            });
        }

        return res.status(201).json({
            err:null,
            msg: "residents retrieved",
            data: building.numResidents
        });


    });
    
    
    
    
    
    
    




}



