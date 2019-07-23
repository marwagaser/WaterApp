var mongoose = require("mongoose"),
	jwt = require("jsonwebtoken"),
	Validations = require("../utils/Validations"),
	Encryption = require("../utils/Encryption"),
	//EMAIL_REGEX = require("../config").EMAIL_REGEX,
	nodemailer = require("nodemailer"),
	xoauth2 = require("xoauth2"),
    User = mongoose.model("User");
    
/**
 * Registration
 
 * @param {string} password
 * @param {string} confrimPassword
 * @param {string} username
 * @return: json {error} or {message} or {message, data(created user)}
 */
//done testing
module.exports.register = function(req, res, next) {
	// Check that the body keys are in the expected format and the required fields are there
	console.log(req.body);
	var valid =
        req.body.username &&
        Validations.isString(req.body.username)&&
        req.body.name &&
        Validations.isString(req.body.name)&&
		req.body.password &&
		Validations.isString(req.body.password) &&
		req.body.confirmPassword &&
        Validations.isString(req.body.confirmPassword)
        req.body.region &&
        Validations.isString(req.body.region)
        req.body.building &&
        Validations.isNumber(req.body.building);
	

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg:
				"username, password, name, region and building are all required fields",
			data: null
		});
	}

	// Check that the password is 8+ characters
	var password = req.body.password.trim();
	if (password.length < 8) {
		return res.status(422).json({
			err: null,
			msg: "Password must be of length 8 characters or more.",
			data: null
		});
	}
	// Check that password matches confirmPassword
	if (password !== req.body.confirmPassword.trim()) {
		return res.status(422).json({
			err: null,
			msg: "password and confirmPassword does not match.",
			data: null
		});
	}
	
	
		User.findOne({
			username: req.body.username.trim().toLowerCase()
		}).exec(function(err, user) {
			// If an err occurred, call the next middleware in the app.js which is the error handler
			if (err) {
				return next(err);
			}
			// If there is a user with this email don't continue
			if (user) {
				return res.status(422).json({
					err: null,
					msg:
						"A user with this username address already exists, please try another username address.",
					data: null
				});
			}
			delete req.body.createdAt;
			delete req.body.updatedAt;
	
			// Encrypt the password before saving the user in the database

			
					User.create(req.body, function(err, newUser) {
						if (err) {
						
						}

                    
						return res.status(201).json({
							err: null,
							msg:
								"Registration successful, you can now login to your account.",
							data: req.body
						});

					});	
			
	
	});
};

/**
 * Login procedure
 * @param {string} email
 * @param {string} password
 * @return: json {err} or {message} or {message, data(token)}
 */
//done testing
module.exports.login = function(req, res, next) {
	// Check that the body keys are in the expected format and the required fields are there
	var valid =
		req.body.username &&
		Validations.isString(req.body.username) &&
		req.body.password &&
		Validations.isString(req.body.password);

	if (!valid) {
		return res.status(422).json({
			err: null,
			msg:
				"username and password are required fields.",
			data: null
		});
	}

	// Find the user with this email from the database
	User.findOne({
		username: req.body.username.trim().toLowerCase()
	}).exec(function(err, user) {
		if (err) {
			return next(err);
		}
		// If user not found then he/she is not registered
		if (!user) {
			return res
				.status(401)
				.json({ err: null, msg: "User not found.", data: null });
		}
		if(req.body.password != user.password){
			return res
					.status(401)
					.json({ err: null, msg: "Password is incorrect.", data: null });
		}
		else{
			var token = jwt.sign(
				{
					// user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
					user: user.toObject()
				},
				req.app.get("secret"),
				{
					expiresIn: "12h"
				}
			);
			// Send the JWT to the frontend
			res.status(200).json({ err: null, msg: "Welcome", data: token });
		}

		// If user found then check that the password he entered matches the encrypted hash in the database
	/*	Encryption.comparePasswordToHash(req.body.password, user.password, function(
			err,
			passwordMatches
		) {
			if (err) {
				return next(err);
			}
			// If password doesn't match then its incorrect
			if (!passwordMatches) {
				return res
					.status(401)
					.json({ err: null, msg: "Password is incorrect.", data: null });
			}
			// Create a JWT and put in it the user object from the database
			var token = jwt.sign(
				{
					// user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
					user: user.toObject()
				},
				req.app.get("secret"),
				{
					expiresIn: "12h"
				}
			);
			// Send the JWT to the frontend
			res.status(200).json({ err: null, msg: "Welcome", data: token });*/
	//	});
	});
};
