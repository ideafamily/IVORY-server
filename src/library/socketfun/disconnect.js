/*jshint esnext: true */
import appsingleton from '../../util/appsingleton';
import getDateTime  from '../getDateTime';

var sharedInstance = appsingleton.getInstance();

function disconnect(socket) {
  sharedInstance.dbmodules.device.findOne({userid : socket.decoded_token._id},
  function(err,device) {
      if(device){
        var index = device.socket_token.indexOf(socket.id);
        if(index != -1){
          device.socket_token.splice(index, 1);
        }
        device.save();
      }
  });
}

module.exports = disconnect;
