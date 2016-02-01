/*jshint esnext: true */

import appsingleton from '../../util/appsingleton';


var sharedInstance = appsingleton.getInstance();

function makeroom(req,res,next) {
  sharedInstance.dbmodules.room.findOne({userid : req.user._doc._id},
    function(err,room) {
    if(room){
      return next();
    }
    var newroom = new (sharedInstance.dbmodules.room)();
    newroom.userid = req.user._doc._id;
    newroom.self = req.user._doc._id;
    newroom.save();
    return next();
  });
}

module.exports = makeroom;
