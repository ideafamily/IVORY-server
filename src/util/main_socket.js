/*jshint esnext: true */

/*npm package*/
import socketioJwt    from 'socketio-jwt';

/*customer library*/
import appsingleton   from './appsingleton';


var sharedInstance = appsingleton.getInstance();

function main_socket() {
  sharedInstance.io.sockets
  .on('connection', socketioJwt.authorize({
    secret: sharedInstance.key,
    timeout: 15000
  })).on('authenticated', function(socket) {
    console.log(socket.decoded_token);
    socket.on('disconnect',function() {
    });
  });

}

module.exports = main_socket;
