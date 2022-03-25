// 链式调用
function addFnc(){
    let arg=[]
    return function temp(...args){
        if(args.length){
            arg=[...arg,...args]
            return temp
        }else{
            let val = arg.reduce((a,b)=>a+b)
            return val
        }
    }
}
const add = addFnc()
console.log(add(1,2)(3)(4)())