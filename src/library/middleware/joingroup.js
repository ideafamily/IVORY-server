/*jshint esnext: true */

import appsingleton from '../../util/appsingleton';


var sharedInstance = appsingleton.getInstance();

function joingroup(req,res,next) {
  sharedInstance.dbmodules.room.findOne({userid : req.user._id},
    function(err,room) {
    if(room){
      var index = room.group.indexOf(req.group._id);
      if(index == -1){
        room.group.push(req.group._id);
      }
      if(req.group.member.indexOf(req.user._id) === -1){
        req.group.member.push(req.user._id);
      }
      room.save();
      req.group.save();
      req.room = room;
      req.tojoin = req.group._id;
      return next();
    }else {
      return res.sendStatus(503);
    }
  });
}

module.exports = joingroup;
