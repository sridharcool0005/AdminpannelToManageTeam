'use strict';

var router = require('express').Router();

var config = require('../config'),
  allowOnly = require('../services/routesHelper').allowOnly,
  AuthController = require('../controllers/authController'),
  UserController = require('../controllers/userController'),
  AdminController = require('../controllers/adminController');
const ClientController = require('../controllers/clientController');
const packageController = require('../controllers/packageController');
const analyticsController = require('../controllers/analyticsController');
const helpdeskController = require('../controllers/helpdeskController');
const bulkprofilecontroller = require('../controllers/bulkprofilecontroller');
const billingcontroller = require('../controllers/billingcontroller');
const bulksmsController = require('../controllers/bulksmsController');
const notificationController = require('../controllers/notificationcontroller');
const dltapprovalcontroller = require('../controllers/dltapprovalcontroller');
const promotionscontroller = require('../controllers/promotionscontroller');



var APIRoutes = function (passport) {
  // POST Routes.
  router.post('/signup', AuthController.signUp);
  router.post('/authenticate', AuthController.authenticateUser);
  router.get('/partner/:partner_id/getClients', ClientController.getclients);
  router.get('/partner/:partner_id/getuserdata', ClientController.getuserdata);
  router.post('/partner/:partner_id/getuserDetails', ClientController.getuserDetails);
  router.put('/partner/:partner_id/updateclientData', ClientController.updateclientData);
  router.post('/partner/:partner_id/deleteclient', ClientController.deleteclient);
  router.post('/addPackages', packageController.addPackage);
  router.put('/updatePackage', packageController.updatePackage);
  router.get('/getAllPackages', packageController.getAllPackages);
  router.post('/getPackageDetails', packageController.getPackageDetails);
  router.post('/deletePackage', packageController.deletePackage);
  router.post('/partner/:partner_id/sendSMS', ClientController.sendSMS);
  router.get('/getpurchaseData', analyticsController.getpurchaseData);
  router.post('/getpurchaseDetailed', analyticsController.getpurchaseDetailed);
  router.post('/getSalesData', analyticsController.getSalesData);
  router.post('/getpurchaseDataByDate', analyticsController.getpurchaseDataByDate);
  router.put('/updatePaymentStatus', analyticsController.updatePaymentStatus);
  router.post('/activationEmail', ClientController.activationEmail);
  router.post('/partner/:partner_id/addnewClient', ClientController.addnewClient);
  router.get('/getAllTickets', helpdeskController.getAllTickets);
  router.put('/updateticketstatus', helpdeskController.updateticketstatus);
  router.post('/getDataByQuery', helpdeskController.getDataByQuery);
  router.post('/partner/:partner_id/createbulkprofiles', bulkprofilecontroller.createbulkprofiles);
  router.post('/updateclientStatus', ClientController.updateclientStatus);
  router.post('/partner/:partner_id/getclientsbyfilter', ClientController.getclientsbyfilter)
  router.get('/getsmspackagelist', billingcontroller.getsmspackagelist)
  router.post('/partner/:partner_id/getclientdetails', billingcontroller.getclientdetails);
  router.post('/getOrderId', billingcontroller.getOrderId);
  router.get('/getpremiumplanlist', billingcontroller.getpremiumplanlist);
  router.post('/postofficeApi', ClientController.postofficeApi);
  router.post('/getplanexpirycontacts', analyticsController.getplanexpirycontacts);
  router.post('/getplanexpirycontactsAll', analyticsController.getplanexpirycontactsAll);
  router.post('/partner/:partner_id/insertnotifications', analyticsController.insertnotifications);
  router.post('/partner/:partner_id/registeredcontactstracking', analyticsController.registeredcontactstracking);
  router.get('/partner/:partner_id/getTodayregisterdData', analyticsController.getTodayregisterdData);
  router.get('/getAllpremiumplans', packageController.getAllportal_premiumplans_master);
  router.post('/getpremiumplandetails', packageController.getpremiumplandetails);
  router.get('/fetchProfessions', ClientController.fetchProfessions);
  router.post('/updatePremiumPlan', packageController.updatePremiumPlan);
  router.post('/deletePremiumPack', packageController.deletePremiumPack);
  router.get('/partner/:partner_id/getuserdataCount', ClientController.getuserdataCount);
  router.get('/partner/:partner_id/getResellerCount', ClientController.getResellerCount);
  router.get('/partner/:partner_id/userdataCountweekly', ClientController.getuserdataCountweekly);
  router.get('/partner/:partner_id/getplanexpirytoday', ClientController.getplanexpirytoday);
  router.get('/partner/:partner_id/getplanexpirynextweek', ClientController.getplanexpirynextweek);
  router.get('/partner/:partner_id/getclientscount', ClientController.getclientscount);
  router.post('/partner/:partner_id/ChangePassword', ClientController.ChangePassword);
  router.get('/partner/:partner_id/getrateCards', packageController.getrateCards);
  router.post('/partner/:partner_id/getpacksbyratecard', packageController.getpacksBYRatecard);
  router.get('/partner/:partner_id/getPremiumRatecards', packageController.getPremiumRatecards);
  router.post('/partner/:partner_id/getPremiumpacksByRateCard', packageController.getPremiumpacksByRateCard);
  router.post('/partner/:partner_id/sendPushnotifySMS', bulksmsController.sendBulkSMS);
  router.post('/partner/:partner_id/sendSingleSMS', bulksmsController.sendSMS);
  router.post('/partner/:partner_id/sendpushnotification', bulksmsController.insertnotifications);
  router.get('/partner/:partner_id/getusersfeedbackqueries',ClientController.getusersfeedbackqueries);
  router.get('/getPartnerData',ClientController.getPartnerData);
  router.post('/send_fcm_notifications', notificationController.send_fcm_notifications);
  router.post('/uploadaudiofile', notificationController.uploadaudiofile);
  router.post('/imagefileupload', notificationController.imagefileupload);

  //dltapi////
  router.post('/getdltlist', dltapprovalcontroller.getdltlist);
  router.post('/getdltdocmentdetails', dltapprovalcontroller.getdltdocmentdetails);
  router.post('/updatedltstatus', dltapprovalcontroller.updatedltstatus);
  router.get('/getdltcumulativelist', dltapprovalcontroller.getdltcumulativelist);
  router.post('/getdltcertificate', dltapprovalcontroller.getdltcertificate);
  router.get('/getAllbannerpromotions', promotionscontroller.getAllbannerpromotions);
  router.post('/getpromotiondatadetailed', promotionscontroller.getpromotiondatadetailed);
  router.post('/updatebannerpromotions', promotionscontroller.updatebannerpromotions);
  router.get('/getallbeontopdata', promotionscontroller.getallbeontopdata);
  router.post('/getbeondatadetailed', promotionscontroller.getbeondatadetailed);
  router.post('/updatebeontopstatus', promotionscontroller.updatebeontopstatus);
  router.post('/getbannersdatabydate', promotionscontroller.getAllbannerpromotionsbydatefilter);
  router.post('/getbeondatabydate', promotionscontroller.getbeondatabydate);
  router.post('/getbannerpromotionsbystatus', promotionscontroller.getbannerpromotionsbystatus);

  router.post('/getbeondatabystatus', promotionscontroller.getbeondatabystatus);

  
  
  
  
  
  
  
  // GET Routes.
  router.get('/profile', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.user, UserController.index));
  router.get('/admin', passport.authenticate('jwt', { session: false }), allowOnly(config.accessLevels.admin, AdminController.index));

  return router;
};

module.exports = APIRoutes;