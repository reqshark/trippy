

function trippleObjects(tripple,_db,fn){
  if(Object.keys(tripple).length != 3)
    throw new TypeError('too few or too many predicates, nest objects')
  var trip = [];
  for (i in tripple)
    trip.push(tripple[i]);
  _db.put(trip.join('::'),JSON.stringify(tripple),function (err){
    if(err) return err;
    return fn(null);
  })
}


/**
 * Module exports.
 */

module.exports = function(levelup,opts){

  if (!levelup) return new TypeError('missing required levelup or sublevel');

  var _db = levelup;

  var db = {
    
    put: function(tripple,fn){

      if (typeof tripple != 'object' && !Array.isArray(tripple))
        throw new TypeError('tripple(s) are of the wrong type');
      if(Array.isArray(tripple)){
        tripple.forEach(function(v,i){
          trippleObjects(v,_db,fn)
        });
      } else {
        return trippleObjects(tripple,_db,fn);
      }
    },
    get: function(query,fn){

      var qKey = Object.keys(query), finding=[];


      //return the object if we query it
      if(qKey.length == 3){
        var trip = [];
        for (i in query)
          trip.push(query[i]);
        return _db.get(trip.join('::'),function (err,t){
          if(err) return err;
          return fn(null,JSON.parse(t));
        });
      }

      var rs = _db.createReadStream();
      
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
    del: function(tripple,fn){
      //pass full tripples to del, partial queries would be too powerful
      //same put/del above in trippleObjects func to produce key... 
      var trip = [];
      for (i in tripple)
        trip.push(tripple[i]);
      _db.del(trip.join('::'),JSON.stringify(tripple),function (err){
        if(err) return fn(err);
        return fn(null,'tripple deleted: ',tripple);
      });
    },
    createReadStream:function(){
      return _db.createReadStream();
    },
    write:function(){
      //implement writestream...
    }
  };

  return db;

}
