/*jshint esnext: true */

/*npm package*/
import FacebookTokenStrategy from 'passport-facebook-token';

/*customer library*/
import appsingleton          from './appsingleton';

var sharedInstance = appsingleton.getInstance();

function fblogin(){
  sharedInstance.passport.use(new FacebookTokenStrategy({
    clientID      : process.env.clientID,
    clientSecret  : process.env.clientSecret
  },function (accessToken, refreshToken, profile, done) {
    sharedInstance.dbmodules.user.findOne({ 'facebook.id' : profile.id },
    function(err,user) {
      if(err){
        return done(err);
      }
      if(user){
        return done(null,user);
      } else {
        var thisuser = sharedInstance.dbmodules.user;
        var newUser = new thisuser();
        newUser.facebook.id = profile.id;
        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
        newUser.facebook.email = profile.emails[0].value;
        newUser.facebook.photo = profile.photos[0].value;
        newUser.save(function(err) {
          if (err)
            throw err;
            return done(null, newUser);
          });
      }
    });
  }));
}

module.exports=fblogin;
