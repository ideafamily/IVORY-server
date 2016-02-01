/*jshint esnext: true */
import appsingleton from '../../util/appsingleton';
import getDateTime  from '../getDateTime';

var sharedInstance = appsingleton.getInstance();

function receivemessage(socket,data) {
  var newmessage = new (sharedInstance.dbmodules.message)();
  newmessage.userid = socket.decoded_token._id;
  newmessage.takerid = data.takerid;
  newmessage.message = data.message;
  newmessage.url = data.url;
  newmessage.group = data.group;
  newmessage.date = getDateTime();

  newmessage.save();

  if(data.group === 0){
    //console.log('user' + data.takerid);
    sharedInstance.io.to('user' + data.takerid).emit('newmessage',data);
  }else {
    sharedInstance.io.to('group' + data.takerid).emit('newmessage',data);
  }
}

module.exports = receivemessage;
