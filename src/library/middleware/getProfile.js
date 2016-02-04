/*jshint esnext: true */

import appsingleton from '../../util/appsingleton';


var sharedInstance = appsingleton.getInstance();

function getProfile(req,res,next) {
  sharedInstance.dbmodules.profile.findOne({user : req.user._id},function(err,profile) {
    if(profile){
      req.profile = profile;
      return next();
    }else {
      var newProfle = new (sharedInstance.dbmodules.profile)();
      if(req.user._doc.facebook === undefined){
        newprofile.userid = req.user._doc._id;
        newprofile.save(function(err,thisprofile) {
          console.log(err);
          req.profile = thisprofile;
          return next();
        });
      }else {
        newProfle.user = req.user._doc._id;
        newProfle.name = req.user._doc.facebook.name;
        newProfle.photo = req.user._doc.facebook.photo;
        newProfle.email = [];
        newProfle.email.push(req.user._doc.facebook.email);
        newProfle.save(function (err,thisprofile) {
          req.profile = thisprofile;
          return next();
        });
      }
    }
  });
}

module.exports = getProfile;
