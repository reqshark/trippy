
/**
 * Module dependencies.
 */

var level = require('levelup');
var Sublevel = require('level-sublevel')

/**
 * Module exports.
 */

module.exports = function(levelup,opts){
  
  if (!levelup) return new TypeError('missing required levelup or sublevel');
  if (!levelup.db) return new TypeError('missing required levelup or sublevel');
  

  //one of the options will be whether to use a sublevel
  //prob better not make that a choice, instead just graphdb through a sublevel

  var _db = levelup;

  var db = {
    
    put: function(tripple,fn){
      
      //we'll use this array to compress our tripple into a meaningful key
      var trip = [];      
      for (i in tripple)
        trip.push(tripple[i])

      //check opts value encoding first before using stringify
      _db.put(trip.join('::'),JSON.stringify(tripple),function(err){
        
        if(err) return fn(err); return fn(null);
      
      });
    },
    get: function(query,fn){

      var qKey = Object.keys(query), finding=[], rs = _db.createReadStream();
      
      rs.on('error',function(err){
        return fn(err);
      })

      rs.on('end',function(){
        return fn(null,finding);
      });

      if(qKey.length == 1){

        rs.on('data', function(chunk){

          if(chunk.key.indexOf(query[qKey[0]]) > -1){

            //verify opts valueEncoding before slowing down perf w/ parse

            finding.push(JSON.parse(chunk.value));
          
          }
        
        });
      } else {
        rs.on('data', function(chunk){
          if((chunk.key.indexOf(query[qKey[0]]) > 0)
            && (chunk.key.indexOf(query[qKey[1]]) > 0)){
            
            //verify opts value encoding yadadamean?
          
            finding.push(JSON.parse(chunk.value));
          
          }
        
        });
      
      }
    
    },
    del: function(){
      //implement del...
    },
    read:function(){
      //implement readstream...
    },
    write:function(){
      //implement writestream...
    }
  };

  return db;

}