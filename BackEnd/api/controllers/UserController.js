var mongoose = require("mongoose"),
  moment = require("moment"),
  Validations = require("../utils/Validations"),
  cloudinary = require("cloudinary"),
  multer = require("multer"),
  cloudinaryStorage = require("multer-storage-cloudinary"),
  path = require("path"),
  User = mongoose.model("User");
  Voucher = mongoose.model("Voucher");
var bodyParser = require("body-parser");
const express = require("express");
var app = express();

cloudinary.config({
  //Your Cloudinary API Data
  cloud_name: "dgwildqsv",
  api_key: "885116352125168",
  api_secret: "dwvBE716ok5Aoh0m2PSWDXIkLCM"
});

Encryption = require("../utils/Encryption");

module.exports.getUsers = function(req, res, next) {
  User.find({}).exec(function(err, users) {
    if (err) {
      return next(err);
    }
    if (!users) {
      return res
        .status(404)
        .json({ err: null, msg: "Users not found.", data: null });
    }
    res.status(200).json({
      err: null,
      msg: "Users retrieved successfully.",
      data: users
    });
  });
};

/**
 * Views all the users of a specific type(expert/user/admin)
 * @param type (String)
 * @return json {error} or{ message ,user}
 */

module.exports.getUserByUsername = function(req, res, next) {
  if (!Validations.isString(req.params.username)) {
    return res.status(422).json({
      err: null,
      msg: "type parameter must be a valid String.",
      data: null
    });
  }
  User.find({ username: req.params.username }).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: "Expert Info retrieved successfully.",
      data: user
    });
  });
};

module.exports.getCurrentPoints = function(req, res, next) {
  if (!Validations.isObjectId(req.decodedToken.user._id)) {
    return res.status(422).json({
      err: null,
      msg: "type parameter must be a valid Object ID.",
      data: null
    });
  }
  User.findById(req.decodedToken.user._id).exec(function(err, user) {
    //console.log(req.params.username);
    if (err) {
      // console.log("hi");
      return next(err);
    }
    if (!user) {
      return res
        .status(404)
        .json({ err: null, msg: "User not found.", data: null });
    }
    res.status(200).json({
      err: null,
      msg: "Current user points retrieved successfully.",
      data: user.points,
      name: user.name
    });
  });
};

module.exports.getVouchers = function(req, res, next) {
  if (!Validations.isObjectId(req.decodedToken.user._id)) {
    return res.status(422).json({
      err: null,
      msg: "type parameter must be a valid ObjectID.",
      data: null
    });
  }
  User.find({ Voucher: req.decodedToken.user.vouchers }).exec(function(
    err,
    user
  ) {
    if (err) {
      console.log("Error");
      return next(err);
    }
    res.status(200).json({
      // Working on this later
    });
  });
};

/**
 * Updates username of user
 * @param {string} username
 * @return json {error} or{ message ,user}
 */
module.exports.updateUser = function(req, res, next) {
  //var username = req.decodedToken.user.username;
  User.findByIdAndUpdate(
    req.decodedToken.user._id,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updatedUser) {
    if (err) {
      return next(err);
    }
    if (!updatedUser) {
      return res
        .status(404)
        .json({ err: null, msg: "User not found.", data: null });
    }

    res.status(200).json({
      err: null,
      msg: "User was updated successfully.",
      data: updatedUser
    });
  });
};

module.exports.updateUsername = function(req, res, next) {
  var username = req.decodedToken.user.username;
  User.findByIdAndUpdate(
    req.decodedToken.user._id,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updatedUser) {
    if (err) {
      return next(err);
    }
    if (!updatedUser) {
      return res
        .status(404)
        .json({ err: null, msg: "User not found.", data: null });
    }

    res.status(200).json({
      err: null,
      msg: "User was updated successfully.",
      data: username
    });
  });
};

module.exports.updateName = function(req, res, next) {
  var name = req.decodedToken.user.name;
  User.findByIdAndUpdate(
    req.decodedToken.user._id,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updatedUser) {
    if (err) {
      return next(err);
    }
    if (!updatedUser) {
      return res
        .status(404)
        .json({ err: null, msg: "User not found.", data: null });
    }

    res.status(200).json({
      err: null,
      msg: "User was updated successfully.",
      data: req.decodedToken.user.name
    });
  });
};
// module.exports.updateUserPassword = function(req, res, next) {
//   User.findByIdAndUpdate(
//     req.decodedToken.user._id,
//     {
//       $set: req.body
//     },
//     { new: true }
//   ).exec(function(err, updatedUser) {
//     if (err) {
//       return next(err);
//     }
//     if (!updatedUser) {
//       return res
//         .status(404)
//         .json({ err: null, msg: "User not found.", data: null });
//     }

//     res.status(200).json({
//       err: null,
//       msg: "Password was updated successfully.",
//       data: "password"
//     });
//   });
// };
module.exports.updateUserPassword = function(req, res, next) {
  if (!Validations.isObjectId(req.decodedToken.user._id)) {
    console.log("not validated");
    return res.status(422).json({
      err: null,
      msg: "User not found",
      data: null
    });
  }
  console.log("valid");
  var valid =
    req.body.password &&
    Validations.isString(req.body.password) &&
    req.body.confirmPassword &&
    Validations.isString(req.body.confirmPassword);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: "new Password and confirmation are both required fields",
      data: null
    });
  }
  console.log("request body ok");
  var password = req.body.password.trim();
  if (password.length < 8) {
    return res.status(203).json({
      err: null,
      msg: "Password must be of length 8 characters or more.",
      data: null
    });
  }
  // Check that password matches confirmPassword
  if (password !== req.body.confirmPassword.trim()) {
    return res.status(203).json({
      err: null,
      msg: "Password and confirmPassword does not match.",
      data: null
    });
  }

  User.findByIdAndUpdate(
    req.decodedToken.user._id,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updatedUser) {
    if (err) {
      return next(err);
    }

    if (!updatedUser) {
      return res
        .status(404)
        .json({ err: null, msg: "User not found.", data: null });
    }

    return res.status(200).json({
      err: null,
      msg: "User was updated successfully.",
      data: updatedUser
    });
  });
};

// If user found then check that the password he entered matches the encrypted hash in the database
/* Encryption.comparePasswordToHash(req.body.password, user.password, function(
      err,
      passwordMatches
    ) {
      if (err) {
        return next(err);
      }
      // If password doesn't match then its incorrect
      if (!passwordMatches) {
        return res
          .status(203)
          .json({ err: null, msg: "Password is incorrect.", data: null });
      }
      var passwordHashed = req.body.confirmPassword;
      Encryption.hashPassword(passwordHashed, function(err, hash) {
        if (err) {
          return next(err);
        }
        if (hash) {
          req.body.password = hash;

          User.findByIdAndUpdate(
            req.decodedToken.user._id,
            {
              $set: req.body
            },
            { new: true }
          ).exec(function(err, updatedUser) {
            if (err) {
              return next(err);
            }
            if (!updatedUser) {
              return res
                .status(404)
                .json({ err: null, msg: "User not found.", data: null });
            }
            res.status(200).json({
              err: null,
              msg: "User was updated successfully.",
              data: updatedUser
            });
          });
        }
      });
    });*/
// });
//};

module.exports.postUserVoucher= async(req, res)=> {
  if (!Validations.isObjectId(req.body.voucherID)) {
    console.log("not validated");
    return res.status(422).json({
      err: null,
      msg: "Not a voucher ID",
      data: null
    });
  }

  const v = await Voucher.findOne({_id:req.body.voucherID}).exec();
  console.log("Before");
  console.log(v);
  console.log("After");
  if(!v){
    return res
        .status(404)
        .json({ err: null, msg: 'Voucher not found.', data: null });
  }
  console.log("foundVOucher");
  User.findByIdAndUpdate( req.decodedToken.user._id,
     { $push : {
    vouchers: v}},
     function ( err ) {
        if(err){
                console.log(err);
        }else{
          res.status(200).json({
            err: null,
            msg: 'Voucher added ',
            data: v
          });
        }
  })
  };