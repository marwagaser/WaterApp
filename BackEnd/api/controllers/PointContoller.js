var mongoose = require("mongoose"),
  moment = require("moment"),
  Validations = require("../utils/Validations"),
  cloudinary = require("cloudinary"),
  multer = require("multer"),
  cloudinaryStorage = require("multer-storage-cloudinary"),
  path = require("path"),
  Point= mongoose.model("Point");
  User = mongoose.model("User");
  Region = mongoose.model("Region");
  Building = mongoose.model("Building");
  WM= mongoose.model("WaterMeter");
  regionCtrl = require("../controllers/RegionController");




  module.exports.calculatePoints= async(regionName, buildingID,reading) => {


 var reg= await Region.findOne({regionName: regionName}).exec();
 var avg= reg.avConsumption;

 var building = await Building.findOne({buildingID: buildingID}).exec();
 var res = building.numResidents;

 var pointsRewarded=0;
 var calc = reading-(avg*res);
 if(calc <= 0){
    pointsRewarded =0;
 }

 else{
     pointsRewarded= parseInt(calc);
 }

 
var users = await User.find({region: regionName,building: buildingID}).exec();

for(i=0;i<users.length;i++){
    var un = users[i].username;
    var num= users[i].points +pointsRewarded;
    
    var point = {
        username: un,
        noPoints: num

    }
    
    Point.create(point);
    User.findByIdAndUpdate ({_id: users[i]._id},{$inc:{"points": + pointsRewarded}}).exec();
}




  }