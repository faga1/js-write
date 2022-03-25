Promise.all = function(iterator){
    let count = 0;
    let res = []
    return new Promise((resolve,reject)=>{
        try{
            for(let i in iterator){
                Promise.resolve(iterator[i]).then((val)=>{
                    console.log(val);
                    count++;
                    res.push(val)
                    if(count===iterator.length){
                        resolve(res)
                    }
                })
            }
        }catch(err){
            reject(err)
        }
    })
    
} 
var promise1 = Promise.resolve(3);
var promise2 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});
var promise3 = 42;

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});