

var levelup = require('levelup');
var trippy = require('./');
var leveldb = levelup('data');
var db = trippy(leveldb);

var tripple1 = {
  s:'requestshark',
  p:'follows',
  o:'badeen'
}

var tripple2= {
  s:'requestshark',
  p:'follows',
  o:'juliangruber'
}

var tripple3 = {
  s:'requestshark',
  p:'follows',
  o:'substack'
}

var tripple4 = {
  s:'badeen',
  p:'follows',
  o:'requestshark'
}

db.put(tripple1, function(err){
  db.put(tripple2, function(err){
    db.put(tripple3, function(err){
      db.put(tripple4, function(err){

        db.get({

          o:'badeen'
        }, function (err, everything){

          //tripples matching the query in any way return all objects in an array
          //it doesn't matter whether the query term matches o,p,s, etc.
          console.log(everything)

        });

      });
    });
  });
});
