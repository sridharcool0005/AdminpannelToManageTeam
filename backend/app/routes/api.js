'use strict';

var router = require('express').Router();

var config = require('../config'),
    allowOnly = require('../services/routesHelper').allowOnly,
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController'),
    AdminController = require('../controllers/adminController');
  const ClientController = require('../controllers/clientController');
  const packageController=require('../controllers/packageController');

var APIRoutes = function (passport) {
    // POST Routes.
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);
    router.get('/getClients', ClientController.getclients);
    router.get('/getuserdata', ClientController.getuserdata);
    router.post('/getuserDetails', ClientController.getuserDetails);
    router.put('/updateclientData', ClientController.updateclientData);
    router.post('/deleteclient', ClientController.deleteclient);
    router.post('/addPackages', packageController.addPackage);
    router.put('/updatePackage', packageController.updatePackage);
    router.get('/getAllPackages', packageController.getAllPackages);
    router.post('/getPackageDetails', packageController.getPackageDetails);
    router.post('/deletePackage', packageController.deletePackage);
    
    

    // GET Routes.
    router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
    router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

    return router;
};

module.exports = APIRoutes;