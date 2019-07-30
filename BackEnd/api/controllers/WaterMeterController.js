var mongoose = require("mongoose"),
  WaterMeter = mongoose.model("WaterMeter");
  Building = mongoose.model("Building");
  Region = mongoose.model("Region");
  userCtrl = require("../controllers/UserController");
  pointCtrl = require("../controllers/PointContoller");


module.exports.insertReading= function(req,res,next){
 
if(req.decodedToken.user.username !== "admin"){
    return res
    .status(401)
    .json({ err: null, msg: "You have no access to that feature", data: null });

};

Building.findOne({buildingID:req.body.buildingID},function(err,building){
    if(err){
       // return next(err);
    }
    if(!building){
        return res
    .status(404)
    .json({ err: null, msg: "Building Not Found", data: null });

    }
  

});

Region.findOne({regionName:req.body.regionName},function(err,region){
    if(err){
       // return next(err);
    }
    if(!region){
        return res
    .status(404)
    .json({ err: null, msg: "Region Not Found", data: null });

    }
  

});



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

pointCtrl.calculatePoints(req.body.regionName, req.body.buildingID,req.body.reading);


};
