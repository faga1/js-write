Function.prototype.myCall = function(context,...args){
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn
    return result
}   
Function.prototype.myApply = function(context,args){
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn
    return result
}
Function.prototype.myBind = function(context,...args){
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn
    return function(){
        return result
    }
}
var obj = {
    a:1
}
function test(){
    console.log(this.a);
}
test.myBind(obj)()