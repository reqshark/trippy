Trippy is all about Tripples
======

Heavily inspired by [levelgraph](https://github.com/mcollina/levelgraph). 

Trippy is a new levelDB module. Experimental, new graph database.

What?
------------

A trippy graph is a mesh of loosely connectable tripples. 

What is a tripple? A JavaScript object of three keys, namely: `'subject','predicate','object'`. Thinking about the grammer in terms of spoken language makes sense. Although it doesn't matter what you name them: `s, p, o` is totally fine. 


Installation
------------

Install packages as needed using `npm`:

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

To simplify graph streams over remote protocols and processes, the goal is compatibility with [multilevel](https://github.com/juliangruber/multilevel) and [sublevel](https://github.com/dominictarr/level-sublevel).

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