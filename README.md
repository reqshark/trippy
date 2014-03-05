Trippy is all about Tripples
======

Cool, another graph database for level, heavily inspired by [levelgraph](https://github.com/mcollina/levelgraph), trippy is a new levelDB module currently in early alpha development.

This is an unstable, very experimental, brand new graph database whose API will change much over the coming days and weeks. Therefore, unless you're crazier than I am, it is not recommended for production.


What?
------------

A trippy graph is just a mesh of connected tripples. What is a tripple? Some would call that a dictionary, but it's just simple JavaScript object of three keys, namely: `'subject','predicate','object'`, and any therein correllary value assignment your heart desires. 

It doesn't matter what you call them: `s, p, o` is ok too. Trippy keys are definitely arbitrary and their corresponding values probably ought to be crafted as arrays instead. But for now I guess lets use the conventions given to us.


Installation
------------

Levelup on the server probably needs leveldown. Install using `npm`:

``` bash
$ npm install trippy levelup leveldown level-sublevel multilevel
```

Example
-------


``` js

var levelup = require('levelup');
var db = trippy(levelup('data'));

var tripple = {
  s:'requestshark',
  p:'follows',
  o:'badeen'
}

db.put(tripple, function (err){
  
  db.get({

    o:'badeen'

  }, function (err,value){

    console.log(value);

  });

});

```

Why?
------------

Needless to say, the high performance of LevelDB and Node.js make for an ideal environment to construct the databases we dream of. 

Trippy is not just about making simple and fun APIs that are super high performance. 

This module is about remote replication. It's primary goal is compatibility with [multilevel](https://github.com/juliangruber/multilevel) and [sublevel](https://github.com/dominictarr/level-sublevel). 

I'm trying to write Trippy functions firmly around the levelup API order to provided us with durable and consistent graph database streams over TCP. This is not meant to be intelligent or fancy, but to keep things simple.