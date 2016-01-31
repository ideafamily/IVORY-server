/*jshint esnext: true */
/**
 *    Copyright (C) Siyuan Gao - All Rights Reserved
 *    Unauthorized copying of this file, via any medium is strictly prohibited
 *    Proprietary and confidential
 *    Written by Siyuan Gao <siyuangao@gmail.com>, 10/6/15
 */

// require("babel/polyfill"); //   Needed for some babel functions, remove after ES6

//  NPM packages
import Express          from 'express';
import BodyParser       from 'body-parser';
import Fs               from 'fs';
import HTTP             from 'http';
import HTTPS            from 'https';

//  Custom library
import AppSingleton     from './util/appsingleton';
import Bootstrap        from './util/bootstrap';
import Startup          from './util/startup';
import Config           from './config/config.json';

//  Log TAG
var TAG = "index";

//  HTTPS Certificates
//  var key = Fs.readFileSync('./cert/cert_p.p12', 'utf8');
//  var cert = Fs.readFileSync('./cert/cert.cer', 'utf8');
//  var credentials = {key, cert};

//  AppSingleton Instance
var sharedInstance = AppSingleton.getInstance();

/*!
 *  Enable sourcemap support (if present)
 */
let sourcemaps = require.resolve('source-map-support');
if (sourcemaps) { require(sourcemaps).install(); }

/*!
 *  Root express application.
 */
let app = Express();

/*!
 *  Pass the express app + multer + config instance to appsingleton
 */
sharedInstance.app = app;


var environment = process.env.NODE_ENV || 'development';

/*!
 *  Environment detection
 */

if(environment == 'production') {
    console.log('loading production configuration');
    sharedInstance.config = Config.production;
} else {
    console.log('loading development configuration');
    sharedInstance.config = Config.development;
}


/*!
 *  Use global express middleware here.
 */
app.use(BodyParser.json()); //  Using bodyparser for POST requests
app.use(BodyParser.urlencoded({ extended: false }));

/*!
 *  Bootstrap the application, setting the proper shared variables in AppSingleton
 */
Bootstrap();


//  Grab the port number or get from deploy environment
let PORT = process.env.PORT || sharedInstance.config.server.port;
let PORT_SSL = process.env.PORT_SSL || sharedInstance.config.server.port_ssl;

/*!
 *  Startup the app, setting the appropriate routes and settings.
 */

Startup().then(function () {
    var server = HTTP.createServer(app).listen(PORT);
    //var server_https = HTTPS.createServer(credentials, app).listen(PORT_SSL);
    var host = server.address().address;
    sharedInstance.L.info(TAG, `HTTP Server running at: ${host}:${PORT}`);
    //sharedInstance.L.info(TAG, `HTTPS Server running at: ${host}:${PORT_SSL}`);
});
