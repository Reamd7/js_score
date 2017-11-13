//处理路径模式,路径读取都是从右向左的
//
//=========================
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

function NewArray() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 212, 3123, 424, 123123, 13123, 144234243, 345346, 1123, 234234, `121231,2342345,1231,123`]
}
// add tests
suite.add('forEach', function() {
        NewArray().forEach(function(value, index, array) {
            array[index] += 1;
        })
    })
    .add('for--', function() {
        var array = NewArray();
        var len = array.length;
        for (var index = len - 1; index >= 0; index--) {
            array[index] += 1;
        }
    })
    .add('for--', function() {
        var array = NewArray();
        var len = array.length;
        for (var index = 0; index < len; index++) {
            array[index] += 1;
        }
    })
    .on('cycle', function(event) { // add listeners
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true }); // run async