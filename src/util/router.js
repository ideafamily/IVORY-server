/*jshint esnext: true */

import appsingleton from './appsingleton.js';

var sharedInstance = appsingleton.getInstance();

function router() {
  var app = sharedInstance.app;
  app.get('/auth/facebook/token',sharedInstance.passport
  .authenticate('facebook-token',{ session: false }),
  function(req,res) {
    res.send(req.user);
  });
}
 module.exports = router;
