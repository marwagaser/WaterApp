var mongoose = require("mongoose"),
	moment = require("moment"),
	Validations = require("../utils/Validations"),
	cloudinary = require('cloudinary'),
	multer  = require('multer'),
	cloudinaryStorage = require('multer-storage-cloudinary'),
	path = require('path'),
	User = mongoose.model("User");
var bodyParser = require("body-parser");
const express = require("express");
var app = express();


cloudinary.config({  //Your Cloudinary API Data
	cloud_name: 'dgwildqsv',
	api_key: '885116352125168',
	api_secret: 'dwvBE716ok5Aoh0m2PSWDXIkLCM'
});


	(Encryption = require("../utils/Encryption"));

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

/**
 * Views all the users that their privacy is only public
 * @param username (String)
 * @return json {error} or{ message ,user}
 */
module.exports.getUser = function(req, res, next) {
	var valid = req.body.username && Validations.isString(req.body.username);

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg: "Username is a required field",
			data: null
		});
	}

	User.findOne({ username: req.body.username }).exec(function(err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res
				.status(404)
				.json({ err: null, msg: "User not found.", data: null });
		}
		res.status(200).json({
			err: null,
			msg: "User retrieved successfully.",
			data: user
		});
	});
};


/**
 * Updates username of user
 * @param {string} username
 * @return json {error} or{ message ,user}
 */
module.exports.updateUser = function(req, res, next) {
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
						data: updatedUser
					});
				});
			};
		//});
	//});
//};


module.exports.updateUserPassword = function(req, res, next) {
	if (!Validations.isObjectId(req.decodedToken.user._id)) {
		return res.status(422).json({
			err: null,
			msg: "User not found",
			data: null
		});
	}

	var valid =
		req.body.email &&
		Validations.isString(req.body.email) &&
		req.body.password &&
		Validations.isString(req.body.password) &&
		req.body.newPassword &&
		Validations.isString(req.body.newPassword) &&
		req.body.confirmPassword &&
		Validations.isString(req.body.confirmPassword);

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg:
				"email(String and of valid email format), password(String) , confirmPassword(String) and newPassword(String) are required fields.",
			data: null
		});
	}
	var password = req.body.newPassword.trim();
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
			msg: "newPassword and confirmPassword does not match.",
			data: null
		});
	}
	User.findOne({
		email: req.body.email.trim().toLowerCase()
	}).exec(function(err, user) {
		if (err) {
			return next(err);
		}
		// If user not found then he/she is not registered
		if (!user) {
			return res
				.status(203)
				.json({ err: null, msg: "User not found.", data: null });
		}

		// If user found then check that the password he entered matches the encrypted hash in the database
		Encryption.comparePasswordToHash(req.body.password, user.password, function(
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
		});
	});
};

