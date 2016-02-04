/*jshint esnext: true */

import appsingleton from '../../util/appsingleton';


var sharedInstance = appsingleton.getInstance();

function setupsocket(req,res,next) {
  sharedInstance.dbmodules.device.findOne({userid : req.user._id},function(err,device) {
    if(device){
      for(var i in device.socket_token){
        if(sharedInstance.io.sockets.connected[device.socket_token[i]] !== undefined){
          sharedInstance.io.sockets.connected[device.socket_token[i]].join('group'+req.tojoin);
        }
      }
      res.sendStatus(200);
    }else {
      res.sendStatus(200);
    }
  });

}

module.exports = setupsocket;
