
//https://github.com/joyent/node/blob/master/doc/api/net.markdown#net_class_net_socket
var fs = require('fs');
var levelup = require('levelup');
var multilevel = require('multilevel');
var net = require('net');
var sublevel = require('level-sublevel');
var trippy = require('../');
var key = 'love';
var leveldb = sublevel(levelup('data', {valueEncoding:'json'}));
var db = trippy(leveldb.sublevel('yourGraphLabel'));

//write the manifest.json
fs.writeFileSync('manifest.json',JSON.stringify(require('level-manifest')(db)))

//abovelevel API interaction, nothing special here
leveldb.put(key,{is:'the answer'},function (err){
  leveldb.get(key,function (err,val){
    console.log(key+' ',val)
  });
});


//stream the multilevel tripple index database from a sublevel
net.createServer(function (con) {
  con.pipe(multilevel.server(db)).pipe(con);
  console.log('a data stream event fired on port 3001')
}).listen(3001); //multilevel.server(db).on('data', console.log.bind(null, 'S ->'))

//stream the multilevel abovelevel database
net.createServer(function (con) {
  con.pipe(multilevel.server(leveldb)).pipe(con);
}).listen(3002);

//set up a few tripples
var tripple1 = {s:'requestshark',p:'follows',o:'badeen'}
  , tripple2= {s:'requestshark',p:'follows',o:'juliangruber'}
  , tripple3 = {s:'requestshark',p:'follows',o:'substack'}
  , tripple4 = {s:'badeen',p:'follows',o:'requestshark'};

//async methods as server.js starts
//trying to stream these to client.
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
