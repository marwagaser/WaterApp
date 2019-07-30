var mongoose = require("mongoose"),

  Region = mongoose.model("Region");
  Building = mongoose.model("Building");




module.exports.addBuildingtoRegion= async(req,res) => {

var b = await Building.findOne({buildingID: req.body.buildingID}).exec();
if(!b){
    return res
    .status(404)
    .json({ err: null, msg: 'Building not found.', data: null });
}


Region.findOneAndUpdate( {regionName: req.body.regionName}, { $push : {buildings: b}},
    function ( err,reg ) {
       if(err){
               
       }
       if(!reg){
        return res
        .status(404)
        .json({ err: null, msg: 'Region not found.', data: null });
       }
       return res
       .status(200)
       .json({ err: null, msg: 'Building added', data: reg });
 });


};

module.exports.addRegion = function(req,res,next){


    Region.create(req.body, function(err, reg) {
        if (err) {
        return next(err);
        }
    
    
        if(reg){
            return res.status(201).json({
            err: null,
            msg:
                "Region Added",
            data: reg
        });
        }
    });	
}
module.exports.avergeConsump = function(regionName,avConsumption){

    Region.findOne({regionName: regionName},function(err,region){
        if(err){
            return avConsumption = "err";
        }
        if(!region){
            return avConsumption = 'Region not found.';
        }
        return avConsumption = region.avConsumption;
      

    });
}

module.exports.getAverage = function(req,res,next){

    Region.findOne({regionName: req.body.regionName},function(err,region){
        if(err){
            return next(err);
        }
        if(!region){
            return res
            .status(404)
            .json({ err: null, msg: 'Region not found.', data: null });
        }
        return res.status(201).json({
            err: null,
            msg:
                "retrieved",
            data: region.avConsumption
        });

    });
};

    module.exports.getResidents= function(req,res,next){
  

            Region.aggregate([
                {$unwind: "$buildings"},
                {$match: {"building.buildingID": req.buildingID}}],
                function(err,result){
                    
                  
            });
             
            Region.findOne({
                'regionName':req.body.regionName,
                'buildings.buildingID' : req.body.buildingID
                
               


            }, function(err,region){
                if(!region){
                    return res
                    .status(404)
                    .json({ err: null, msg: 'Region not found.', data: null });
                }
              
                return res.status(201).json({
                    err: null,
                    msg:"retrieved",
                    data: region
                });
            });

            

            
    







    }






