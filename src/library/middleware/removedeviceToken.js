/*jshint esnext: true */

import appsingleton from '../../util/appsingleton';


var sharedInstance = appsingleton.getInstance();

function removedeviceToken(req,res,next) {
  sharedInstance.dbmodules.device.findOne({'userid' : req.user._id},function (err,device) {
    if(req.body.iOS === undefined){
      req.body.iOS = '';
    }
    if(req.body.android === undefined){
      req.body.android = '';
    }
    if(device){
      var index = device.iOS.indexOf(req.body.iOS);
      if(index != -1){
        device.iOS.splice(index, 1);
      }
      index = device.android.indexOf(req.body.android);
      if(index != -1){
        device.android.splice(index, 1);
      }
      device.save();
    }
    res.sendStatus(200);
  });
}

module.exports = removedeviceToken;
