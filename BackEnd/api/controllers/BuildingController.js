var mongoose = require("mongoose"),
 
  Building = mongoose.model("Building");



module.exports.createBuilding= function(req,res,next){
  
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



