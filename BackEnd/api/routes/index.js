var express = require("express"),
  router = express.Router(),
  jwt = require("jsonwebtoken"),
  cloudinary = require("cloudinary"),
  multer = require("multer"),
  cloudinaryStorage = require("multer-storage-cloudinary"),
  path = require("path"),
  express = require("express"),
  app = express();
cloudinary.config({
  //Your Cloudinary API Data
  cloud_name: "dgwildqsv",
  api_key: "885116352125168",
  api_secret: "dwvBE716ok5Aoh0m2PSWDXIkLCM"
});
(userCtrl = require("../controllers/UserController")),
  (sponsorCtrl = require("../controllers/SponsorController")),
  (voucherCtrl = require("../controllers/VoucherController")),
  (wmCtrl= require("../controllers/WaterMeterController")),
  (regionCtrl = require("../controllers/RegionController")),
  (buildingCtrl = require("../controllers/BuildingController")),
  (authCtrl = require("../controllers/AuthenticationController"));


router.get("/", function(req, res, next) {
  res.send("Server");
});
/////////////////////////////
var isAuthenticated = function(req, res, next) {
  var token = req.headers["authorization"];

  token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({
      error: null,
      msg: "You have to login first before you can access your lists.",
      data: null
    });
  }
  jwt.verify(token, req.app.get("secret"), function(err, decodedToken) {
    if (err) {
      return res.status(401).json({
        error: err,
        msg: "Login timed out, please login again.",
        data: null
      });
    }
    req.decodedToken = decodedToken;
    next();
  });
};

var isNotAuthenticated = function(req, res, next) {
  // Check that the request doesn't have the JWT in the authorization header
  var token = req.headers["authorization"];
  if (token) {
    return res.status(403).json({
      error: null,
      msg: "You are already logged in.",
      data: null
    });
  }
  next();
};

///////////////////////////////////////////////////////////////////////

router.post("/auth/register", isNotAuthenticated, authCtrl.register);
router.post("/auth/login", isNotAuthenticated, authCtrl.login);

router.get("/user/getUsers", userCtrl.getUsers);
router.get(
  "/user/getUserVouchers",
  isAuthenticated,
  userCtrl.getUserVouchers
);

router.get(
  "/user/getCurrentPoints",
  isAuthenticated,
  userCtrl.getCurrentPoints
);

router.post("/user/updateUsername", isAuthenticated, userCtrl.updateUsername);
router.post("/user/updateName", isAuthenticated, userCtrl.updateName);
router.post(
  "/user/updatePassword",
  isAuthenticated,
  userCtrl.updateUserPassword
);
router.post(
  "/user/updateUserPoints/",
  isAuthenticated,
  userCtrl.updateUserPoints
);
router.post(
  "/user/postUserVoucher/",
  isAuthenticated,
  userCtrl.postUserVoucher
);


router.get(
  "/company/getCompany/:companyId",
  isAuthenticated,
  sponsorCtrl.getCompany
);
router.get(
  "/company/getCompanyName/:_id",
  isAuthenticated,
  sponsorCtrl.getCompanyName
);

router.get("/voucher/get", voucherCtrl.getVouchers);
router.post("/voucher/post", voucherCtrl.postVoucher);
router.delete("/voucher/delete/:_id", voucherCtrl.deleteVoucher);
router.get("/voucher/get/:_id", voucherCtrl.findVoucher);

router.post("/wm/insertReading",isAuthenticated,wmCtrl.insertReading);

router.post("/region/getAverage",isAuthenticated,regionCtrl.getAverage);
router.post("/region/create",isAuthenticated,regionCtrl.addRegion);
router.post("/region/buildingRes",isAuthenticated, regionCtrl.getResidents);
router.post("/building/create",isAuthenticated,buildingCtrl.createBuilding);
router.post("/region/addbuilding",isAuthenticated,regionCtrl.addBuildingtoRegion);
router.post("/building/residents",isAuthenticated,buildingCtrl.getResidents);


module.exports = router;
