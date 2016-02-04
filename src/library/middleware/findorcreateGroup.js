/*jshint esnext: true */

import appsingleton from '../../util/appsingleton';


var sharedInstance = appsingleton.getInstance();

function findorcreateGroup(req,res,next) {
  if(req.query.groupid === undefined && req.query.courseId === undefined){
    return res.sendStatus(404);
  }
  if(req.query.groupid === undefined){
    sharedInstance.dbmodules.group.findOne({courseId : req.query.courseId},function(err,group) {
      if(err){
        return res.sendStatus(503);
      }
      if(group){
        req.group = group;
        return next();
      }else {
        var newGroup = new (sharedInstance.dbmodules.group)();
        newGroup.courseId = req.query.courseId;
        newGroup.founder = 'system';
        newGroup.subgroup = 0;
        newGroup.save(function (err,thisgroup) {
          req.group = thisgroup;
          return next();
        });
      }
    });
  }else {
    sharedInstance.dbmodules.group.findOne({_id : req.query.groupid}, function(err, group) {
      if(err){
        return res.sendStatus(503);
      }
      if(group){
        req.group = group;
        return next();
      }
      return res.sendStatus(404);
    });
  }

}

module.exports = findorcreateGroup;
