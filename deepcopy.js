let obj = {
    a:{
        b:'12',
        c:3,
        e:{
            f:1
        }
    },
    d:4
}
function deepCopy(obj){
    let newObj;
    newObj = {...obj}
    Object.keys(newObj).forEach((key)=>{
        if(newObj[key] instanceof Object) newObj[key] = deepCopy(newObj[key])
    })
    return newObj
}