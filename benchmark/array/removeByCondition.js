//处理路径模式,路径读取都是从右向左的
//
function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
        list[i] = list[k];
    }
    list.pop();
}

function fastDelete(list, condition) {
    var length = list.length;
    var indexList = [];
    var count = 0
    for (var index = 0; index < length; index++) {
        if (condition(index, list[index], list)) {
            indexList.push(index);
            count++
        }
    }
    for (var index = 0; index < count; index++) {
        var DelIndex = indexList[index];
        spliceOne(list, DelIndex)
    }
    return list
}
//===========================
function DeleteNewArray(list, condition) {
    var length = list.length;
    var newArray = [];
    for (var index = 0; index < length; index++) {
        if (!condition(index, list[index], list)) {
            newArray.push(list[index])
        }
    }
    return newArray;
}
//===========================
function VanillaJS(list, condition) {
    var length = list.length;
    var indexList = [];
    var count = 0
    for (var index = 0; index < length; index++) {
        if (condition(index, list[index], list)) {
            indexList.push(index);
            count++
        }
    }
    for (var index = 0; index < count; index++) {
        var DelIndex = indexList[index];
        list.splice(index, 1);
    }
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
        fastDelete(NewArray(), function(index) {
            if (index % 2 == 0) {
                return true
            } else {
                return false
            }
        });
    })
    .add('新建数组', function() {
        DeleteNewArray(NewArray(), function(index) {
            if (index % 2 == 0) {
                return true
            } else {
                return false
            }
        });
    })
    .add('原生数组删除', function() {
        VanillaJS(NewArray(), function(index) {
            if (index % 2 == 0) {
                return true
            } else {
                return false
            }
        });
    })
    .add('_.remove', function() {
        _.remove(NewArray(), function(value, index) {
            return (index % 2 == 0)
        })
    })
    .on('cycle', function(event) { // add listeners
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true }); // run async