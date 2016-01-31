/*jshint esnext: true */

/*npm package*/
import socketioJwt    from 'socketio-jwt';

/*customer library*/
import appsingleton   from './appsingleton';


var sharedInstance = appsingleton.getInstance();

function main_socket() {
  sharedInstance.io
  .on('connection', socketioJwt.authorize({
    secret: sharedInstance.key,
    timeout: 15000
  })).on('authenticated', function(socket) {
    //console.log(socket.decoded_token);
    sharedInstance.dbmodules.device.findOne({userid : socket.decoded_token._id},
    function(err,device) {
      if(device){
        if(device.socket_token === undefined){
          device.socket_token = [];
        }
        device.socket_token.push(socket.id);
        device.save();
      }else {
        var newdevice = new (sharedInstance.dbmodules.device)();
        newdevice.userid = socket.decoded_token._id;
        newdevice.socket_token = [];
        newdevice.socket_token.push(socket.id);
        newdevice.save();
      }
    });
    socket.on('disconnect',function() {
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
    });
  });

}

module.exports = main_socket;
