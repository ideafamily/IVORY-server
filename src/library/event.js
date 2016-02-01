/*jshint esnext: true */
import appsingleton from '../util/appsingleton';
import getDateTime  from './getDateTime';

var sharedInstance = appsingleton.getInstance();

function event(socket) {
  socket.on('message',function(data) {
    sharedInstance.socketfun.receivemessage(socket,data);
  });
  socket.on('disconnect',function() {
    sharedInstance.socketfun.disconnect(socket);
  });
}

module.exports = event;
