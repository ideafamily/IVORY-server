/*jshint esnext: true */
/**
 *    Copyright (C) Siyuan Gao - All Rights Reserved
 *    Unauthorized copying of this file, via any medium is strictly prohibited
 *    Proprietary and confidential
 *    Written by Siyuan Gao <siyuangao@gmail.com>, 10/6/15
 */

/*!
 *  After bootstrap, all the necessary promises, values are defined in AppSingleton
 *  In startup.js we will begin loading the appropriate routes, settings
 */

import AppSingleton     from './appsingleton';
import Promise          from 'bluebird';
import mongoose         from 'mongoose';
import Q                from 'q';

/**
 * startup the application, setting the proper path
 *
 * @comment use startup after bootstrap
 * @method startup
 * @return {Promise} Returns a promise that will be resolved when startup is complete
 */
function startup() {

    //  Log tag
    var TAG = "startup";

    //  This instance is shared across the entire app life-cycle
    var sharedInstance = AppSingleton.getInstance();
    var list = [new Promise(function(resolve, reject) {
      return resolve();
    })];
    list.push(new Promise(function(resolve, reject) {
      sharedInstance.db = mongoose.connect(process.env.dbURL);
    }));


    return new Promise(function(resolve, reject) {
    Q.all(list).then(function () {
      sharedInstance.L.info(TAG, "Startup done!");
      return resolve({ });
    });
    Q.any(list).catch(function(err) {
      sharedInstance.L.warn(TAG, "Startup failed!");
      sharedInstance.L.error(TAG, "error: "+err);
      return reject({ });
    });
  });

}
export default startup;
