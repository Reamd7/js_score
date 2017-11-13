//处理路径模式,路径读取都是从右向左的
//
function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
        list[i] = list[k];
    }
    list.pop();
}

function fastDelete(list, index, length) {
    for (var i = index, k = i + length, n = list.length; k < n; i += 1, k += 1) {
        list[i] = list[k];
    }
    while (length) {
        list.pop();
        length--
    }
    return list;
}

function fastDelete2(list, index, length) {
    for (var i = index, k = i + length, n = list.length; k < n; i += 1, k += 1) {
        list[i] = list[k];
    }
    list.length -= length
    return list;
}
//===========================
function DeleteNewArray(list, index, length) {
    var length = list.length;
    while (length) {
        list[index + length] = undefined;
        length--
    }
    var newArray = [];
    for (var index = 0; index < length; index++) {
        var el = list[index];
        if (el !== undefined) {
            newArray.push(el)
        }
    }
    return newArray;
}
//===========================
function VanillaJS(list, index, length) {
    list.splice(index, length);
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
        fastDelete(NewArray(), 2, 10);
    })
    .add('快速删除2', function() {
        fastDelete2(NewArray(), 2, 10);
    })
    .add('新建数组', function() {
        DeleteNewArray(NewArray(), 2, 10);
    })
    .add('原生数组删除', function() {
        VanillaJS(NewArray(), 2, 10);
    })
    .on('cycle', function(event) { // add listeners
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true }); // run async