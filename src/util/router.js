/*jshint esnext: true */

import appsingleton from './appsingleton.js';
import jwt          from 'jsonwebtoken';

var sharedInstance = appsingleton.getInstance();

function router() {
  var app = sharedInstance.app;
  app.get('/auth/facebook/token',sharedInstance.passport
  .authenticate('facebook-token',{ session: false }),
  function(req,res) {
    var token = jwt.sign(req.user, sharedInstance.key, {expiresIn : '10h'},
  { algorithm: 'RS256'});
    res.send({token : token});
  });
}
 module.exports = router;
