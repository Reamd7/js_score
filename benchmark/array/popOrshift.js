function NewArray() {
    var list = new Array();
    for (var index = 0; index < 100000; index++) {
        list.push(index);
    }
    return list
}

function pop(list) {
    var len = list.length;
    while (len) {
        list.pop()
        len--
    }
    return list;
}

function shift(list) {
    var len = list.length;
    while (len) {
        list.shift()
        len--
    }
    return list;
}

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

// add tests
suite.add('pop', function() {
        pop(NewArray())
    })
    .add('shift', function() {
        shift(NewArray())
    })
    .on('cycle', function(event) { // add listeners
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true }); // run async