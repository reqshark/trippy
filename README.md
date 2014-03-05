Trippy is all about Tripples
======

Cool, another graph database for level, but this one is heavily inspired by [levelgraph](https://github.com/mcollina/levelgraph). 

Trippy is a new levelDB module in early alpha development.

It's an unstable, very experimental, brand new graph database. The API will change a lot over the coming days and weeks.

Therefore, unless you're crazier than I am, it is not recommended for production.


What?
------------

A trippy graph is a mesh of loosely connectable tripples. 

What is a tripple? Some would call that a dictionary, but it's just simple JavaScript object of three keys, namely: `'subject','predicate','object'`, and any therein correllary value assignment your heart desires. 

It doesn't matter what you name them: `s, p, o` is totally fine. 

Trippy keys are arbitrary and their corresponding values ought to be crafted as arrays instead. But for now I guess lets use the conventions given to us.


Installation
------------

Levelup on the server probably needs leveldown. Install packages as needed using `npm`:

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

Needless to say, the high performance of LevelDB, Node.js as well as the portability of JavaScript make for [an ideal environment to construct the databases we dream of](https://github.com/rvagg/node-levelup/wiki/Resources). 

Trippy is not just about simple and fun APIs that are super high performance. 

This module seeks to simplify streaming across protocols. Its primary goal is compatibility with [multilevel](https://github.com/juliangruber/multilevel) and [sublevel](https://github.com/dominictarr/level-sublevel).

Multilevel for network exposure, sublevel for supporting minimally invasive modularity available to other level data design/structures.

I guess I'm trying to write these trippy functions firmly around [the levelup API](https://github.com/rvagg/node-levelup#api) to give us durable graph streams over TCP. This is not meant to be intelligent or fancy, but to keep things simple. 

Since sublevel partitions levelDB trippy can hook in its core functionality without impacting abovelevel or other sublevel architectures.

To understand more about this motivation and vision, [check out this gist](https://gist.github.com/rvagg/8345644).



License
-------

(The MIT License)

Copyright (c) 2014 Bent Cardan &lt;shark@stockickr.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.