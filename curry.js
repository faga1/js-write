// // 函数柯里化 
// // 相当于在函数参数还没到一定长度的时候先将参数存起来，参数长度到了再执行
// var curry = function (fn,...args) {
//     let length = fn.length
//     return function(...arg) {
//         var newArgs = [...args,...arg]
//         if(newArgs.length<length){
//             return curry(fn,...newArgs)
//         }else{
//             return fn.apply(this, newArgs);
//         }
//     };
// };

function add(a, b) {
    return a + b;
}

var addCurry = curry(add, 1, 2);
console.log(addCurry()) // 3
//或者
var addCurry = curry(add, 1);
console.log(addCurry(2)) // 3
//或者
var addCurry = curry(add);
console.log(addCurry(1)(2)) // 3
var fn = curry(function(a, b, c) {
    return [a, b, c];
});

console.log(fn("a", "b", "c")) // ["a", "b", "c"]
console.log(fn("a", "b")("c")) // ["a", "b", "c"]
console.log(fn("a")("b")("c")) // ["a", "b", "c"]
console.log(fn("a")("b", "c")) // ["a", "b", "c"]
function curry(fn,...args){
    let len = fn.length;
    return function(...arg){
        let newArgs = [...args,...arg]
        if(newArgs.length<len){
            return curry(fn,...newArgs)
        }else{
            return fn.call(this,...newArgs)
        }
    }
}