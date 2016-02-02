/*jshint esnext: true */

import appsingleton from '../../util/appsingleton';


var sharedInstance = appsingleton.getInstance();

function findclass(req,res,next) {
  var query = [];
  var object;
  if(req.query.Abbreviation !== undefined){
    object = {Abbreviation : req.query.Abbreviation.toUpperCase()};
    query.push(object);
  }
  if(req.query.Number !== undefined){
    object = {'Number' : req.query.Number};
    query.push(object);
  }
  if(req.query.Title !== undefined){
    if(query.length === 0)
      query.push({Title : req.query.Title});
    sharedInstance.dbmodules.class.
    find({$or : [{$and : query},{Title : req.query.Title}]},
      function(err,thisclass) {
        if(err){
          console.log(err);
          res.sendStatus(503);
        }
        else {
          res.status(200).send({class : thisclass});
        }
    });
  }else {
    sharedInstance.dbmodules.class.find({$and : query},function(err,thisclass){
      if(err){
        console.log(err);
        res.sendStatus(503);
      }
      else {
        res.status(200).send({class : thisclass});
      }
    });
  }

}

module.exports = findclass;
