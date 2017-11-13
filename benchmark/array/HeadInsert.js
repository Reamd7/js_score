var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;


function Init() {
    var list = [];
    for (var index = 0; index < 10000; index++) {
        list.push(index);
    }
    return list
}
// Array.prototype.clone = function() { return this.slice(0); }
var array = Init();

function NewArray() {
    var [...arr2] = array;
    return arr2
}

function unshift() {
    var arr = NewArray();
    var newArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    for (var index = 0, len = newArray.length; index < len; index++) {
        arr.unshift(newArray[index]);
    }
    return arr;
}

function concat() {
    var arr = NewArray();
    var newArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    return newArray.concat(arr);
}

function add() {
    var arr = NewArray();
    var len = arr.length
    var newArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    for (var index = 0; index < len; index++) {
        // var element = array[index];
        newArray.push(arr[index])
    }
    return newArray;
}

function add2() {
    var list = NewArray();
    var newArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    index = newArray.length;
    for (var i = index, k = i + 1, n = list.length + 1; k < n; i += 1, k += 1) {
        list[i] = list[k];
    }
    for (var i = 0; i < index; i++) {
        list[i] = newArray[i];
    }
    return newArray;
}
// add tests
suite.add('unshift', function() {
        unshift()
    })
    .add('concat', function() {
        concat()
    })
    .add('pushToNewArray', function() {
        add()
    })
    .add('add2', function() {
        add2()
    })
    .on('cycle', function(event) { // add listeners
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true }); // run async