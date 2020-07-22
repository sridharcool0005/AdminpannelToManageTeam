'use strict';

var jwt = require('jsonwebtoken');

var config = require('../config'),
    db = require('../services/database'),
    User = require('../models/user');
    const crypto = require("crypto");
// The authentication controller.
var AuthController = {};

// Register a user.
AuthController.signUp = function(req, res) {
    if(!req.body.email_id || !req.body.password) {
        res.json({ message: 'Please provide a username and a password.' });
    } else {
        const authkey = crypto.randomBytes(16).toString("hex");
        const user_id = crypto.randomBytes(4).toString("hex");
        db.sync().then(function() {
            var newUser = {
                authkey:authkey,
                user_id:user_id,
                email_id: req.body.email_id,
                password: req.body.password,
                mobile_number:req.body.mobile_number
                
            };

            return User.create(newUser).then(function() {
                res.status(201).json({ message: 'Account created!' });
            });
        }).catch(function(error) {
            console.log(error);
            res.status(403).json({ message: 'email  already exists!' });
        });
    }
}

// Authenticate a user.
AuthController.authenticateUser = function(req, res) {
    if(!req.body.email_id || !req.body.password) {
        res.status(404).json({ message: 'email_id and password are needed!' });
    } else {
        var email_id = req.body.email_id,
            password = req.body.password,
            potentialUser = { where: { email_id: email_id } };

        User.findOne(potentialUser).then(function(user) {
            if(!user) {
                res.status(404).json({ message: 'Authentication failed!' });
            } else {
                user.comparePasswords(password, function(error, isMatch) {
                    if(isMatch && !error) {
                        var token = jwt.sign(
                            { email_id: user.email_id },
                            config.keys.secret,
                            { expiresIn: '30m' }
                        );

                        res.json({
                            success: true,
                            token: 'JWT ' + token,
                            role: user.role
                        });
                    } else {
                        res.status(404).json({ message: 'Login failed!' });
                    }
                });
            }
        }).catch(function(error) {
            res.status(500).json({ message: 'There was an error!' });
        });
    }
}

module.exports = AuthController;