//处理路径模式,路径读取都是从右向左的
//
function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
        list[i] = list[k];
    }
    list.pop();
}

function fastDelete(list, index) {
    return spliceOne(list, index)
}
//===========================
function DeleteNewArray(list, index) {
    var length = list.length;
    list[index] = undefined;

    var newArray = [];
    for (var index = 0; index < length; index++) {
        var element = list[index];
        if (undefined !== element) {
            newArray[index] = element;
        }
    }
    return newArray;
}
//===========================
function VanillaJS(list, index) {
    list.splice(index, 1);
    return list
}
//=========================
var _ = require("lodash");
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

function NewArray() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 212, 3123, 424, 123123, 13123, 144234243, 345346, 1123, 234234, `121231,2342345,1231,123`]
}
// add tests
suite.add('快速删除', function() {
        fastDelete(NewArray(), 10);
    })
    .add('新建数组', function() {
        DeleteNewArray(NewArray(), 10);
    })
    .add('原生数组删除', function() {
        VanillaJS(NewArray(), 10);
    })
    .add('_.pullAt', function() {
        _.pullAt(NewArray(), 10)
    })
    .add('_.remove', function() {
        _.remove(NewArray(), function(value, index) {
            return index == 10
        })
    })
    .on('cycle', function(event) { // add listeners
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true }); // run async