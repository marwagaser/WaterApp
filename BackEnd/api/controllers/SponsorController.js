var mongoose = require("mongoose"),
	moment = require("moment"),
	Validations = require("../utils/Validations");
	
//User = mongoose.model("User");

module.exports.getCompany = async (req, res) => {
    if (!Validations.isObjectId(req.params.companyId)) {
      return res.status(422).json({
        err: null,
        msg: 'CompanyID parameter must be a valid ObjectId.',
        data: null
      });
    }
    const company = await Sponsor.findById(req.params.companyId).exec();
    if (!company) {
      return res
        .status(404)
        .json({ err: null, msg: 'Company not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Company retrieved successfully.',
      data: company
    });
  };