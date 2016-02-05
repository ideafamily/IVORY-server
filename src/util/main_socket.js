/*jshint esnext: true */

/*npm package*/
import socketioJwt    from 'socketio-jwt';

/*customer library*/
import appsingleton   from './appsingleton';
import getDateTime    from '../library/getDateTime';
import event          from '../library/event';


var sharedInstance = appsingleton.getInstance();

function main_socket() {
  sharedInstance.io
  .on('connection', socketioJwt.authorize({
    secret: sharedInstance.key,
    timeout: 15000
  })).on('authenticated', function(socket) {
    sharedInstance.dbmodules.room.findOne({userid : socket.decoded_token._id},
      function(err,room) {
        //console.log(room);
      socket.join('user' + room.self);
      for(var i in room.group){
        socket.join('group' + room.group[i]);
      }
      //console.log(event);
      event(socket);
      socket.emit('setup complete');
    });
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
  });

}

module.exports = main_socket;
