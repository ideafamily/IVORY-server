/*jshint esnext: true */

import appsingleton from './appsingleton.js';
import jwt          from 'jsonwebtoken';

var sharedInstance = appsingleton.getInstance();

function makeToken(req,res) {
  var token = jwt.sign(req.user._doc, sharedInstance.key, {expiresIn : '10h'},
{ algorithm: 'RS256'});
  res.status(200).send({token :token,
                        profile : req.profile});
}

function verifyToken(req,res,next) {
  jwt.verify(req.headers['x-access-token'],sharedInstance.key,function(err,decoded) {
    if(err){
      return res.sendStatus(401);
    }
    req.user = decoded;
    return next();
  });
}

function router() {
  var app = sharedInstance.app;

  app.get('/auth/facebook/token',sharedInstance.passport
  .authenticate('facebook-token',{ session: false }),
  sharedInstance.middleware.makeroom,
  sharedInstance.middleware.getProfile,
  makeToken);

  app.post('/auth/local/register',function (req,res,next) {
    sharedInstance.passport.authenticate('register',function(err,user,info) {
      if(err){
        return res.sendStatus(503);
      }
      if(user){
        req.user = user;
        return next();
      }else {
        return res.sendStatus(401);
      }
    })(req,res,next);
  },sharedInstance.middleware.makeroom,
  sharedInstance.middleware.getProfile,
  makeToken);

  app.post('/auth/local/login',function(req,res,next) {
    sharedInstance.passport.authenticate('login',function (err,user,info) {
      if(err){
        return res.sendStatus(503);
      }
      if(user){
        req.user = user;
        return next();
      }else {
        return res.sendStatus(401);
      }
    })(req,res,next);
  },sharedInstance.middleware.makeroom,
  sharedInstance.middleware.getProfile,
  makeToken);
  app.post('/logout', verifyToken,sharedInstance.middleware.removedeviceToken);

  app.get('/api/class',sharedInstance.middleware.findclass);

  app.get('/api/joingroup',verifyToken,sharedInstance.middleware.findorcreateGroup,
  sharedInstance.middleware.joingroup,
  sharedInstance.middleware.setupsocket);
}

 module.exports = router;
