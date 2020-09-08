'use strict';

// NPM dependencies.
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    sequelize = require('sequelize'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    path = require('path');
    const cors = require('cors');

// App related modules.
var hookJWTStrategy = require('./services/passportStrategy');

// Initializations.
var app = express();

// Parse as urlencoded and json.
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Hook up the HTTP logger.
app.use(morgan('dev'));
app.use(cors());

// Hook up Passport.
app.use(passport.initialize());

// Hook the passport JWT strategy.
hookJWTStrategy(passport);

// Set the static files location.
app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../myfolder'))
app.use(express.static(__dirname + '/../digitalprofiles'));
app.use(express.static(__dirname + '/../dist'));
app.use(express.static(__dirname + '/../apkuploads'));
app.use(express.static(__dirname + '/../paymentEvidenceproofs'));
// Bundle API routes.
app.use('/api', require('./routes/api')(passport));
app.use('/api', require('./routes/templateRoute'));
app.use('/api', require('./routes/digitalprofileroute'));
app.use('/api', require('./routes/apkroute'));
app.use('/api', require('./routes/evidenceroute'));
// Catch all route.
// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/../public/app/views/index.html'));
// });
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
});


// Start the server.
app.listen('8080', function() {
    console.log('Magic happens at http://localhost:8080/! We are now all now doomed!');
});
