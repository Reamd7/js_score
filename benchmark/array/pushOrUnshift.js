//处理路径模式,路径读取都是从右向左的
//

function push() {
    var list = [];
    for (var index = 0; index < 100001; index++) {
        list.push(index);
    }
    return list
}

function push2() {
    var list = [];
    for (var index = 100000; index >= 0; index--) {
        list.push(index);
    }
    return list
}
//===========================
function unshift() {
    var list = [];
    for (var index = 100000; index >= 0; index--) {
        list.unshift(index);
    }
    return list
}

function unshift2() {
    var list = [];
    for (var index = 0; index < 100001; index++) {
        list.unshift(index);
    }
    return list
}
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

// add tests
suite.add('push', function() {
        push()
    })
    .add('push--', function() {
        push2()
    })
    .add('unshift--', function() {
        unshift()
    })
    .add('unshift++', function() {
        unshift2()
    })
    .on('cycle', function(event) { // add listeners
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true }); // run async