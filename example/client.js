var multilevel = require('multilevel');
var net = require('net');
var trippy = require('../');

//pass the server's written manifest to the client, pointless in this ex.
var db = multilevel.client(require('./manifest.json'));
//not going to do that for regular level
var leveldb = multilevel.client();

//light up the connections
var con1 = net.connect(3001), con2 = net.connect(3002);

con1.pipe(db.createRpcStream()).pipe(con1);
con2.pipe(leveldb.createRpcStream()).pipe(con2);

//connect async methods to multilevel abovelevel database
//leveldb.put('key','the key\'s value',function(err){
//  leveldb.createReadStream().on('data',console.log)
//})

db.get({s:'rhino'},function(err,val){
  setTimeout(function(){

    var rs = db.createReadStream();

    console.log('start streaming tripples to client.. ')

    rs.on('data',function(data){
      console.log(JSON.parse(data.value))
      console.log('\n')
    });

    rs.on('end',function(){
      console.log('stream is done.')
    })


  },1000)
})
