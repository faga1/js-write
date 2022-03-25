const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

// 用来处理返回值是一个promise对象的情况,返回值是一个promise对象的时候需要等它resolve或者reject再对应的resolve或reject
const resolvePromise = (promise2,x,resolve,reject)=>{
    //这个promise对象不能是自己本身
    if(promise2===x){
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    //如果 then 的返回值 x 是一个 promise，且 x 同时调用 resolve 函数和 reject 函数，则第一次调用优先，其他所有调用被忽略；
    let called;
    if(typeof x === 'object' && x!== null || typeof x === 'function'){
        
        try{
            if(typeof x.then === 'function'){
                // 我们需要拿到x中resolve的东西
                x.then(y=>{
                    if(called) return;
                    called=true;
                    // 如果x resolve的还是一个promise对象,那么我们还是不能轻易的把这个值resolve出,我们需要递归直到resolve了一个普通值
                    resolvePromise(promise2,y,resolve,reject)
                },r=>{
                    if(called) return;
                    called=true;
                    reject(r)
                })
            }else{
                // x没有then方法证明他不是promise对象，那么我们就可以直接resolve这个函数了
                resolve(x)
            }
            
        }catch(err){
            if(called) return;
            called = true;
            reject(err)
        }
    }else{
        resolve(x)
    }
}
function Promise(executor){
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    // 先将.then中的函数存起来,在resolve和reject的时候调用
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (val)=>{
        this.value = val;
        this.state = FULFILLED;
        this.onResolvedCallbacks.forEach(fn=>fn())
    }
    let reject = (val) =>{
        this.reason = val;
        this.state = REJECTED;
        this.onRejectedCallbacks.forEach(fn=>fn())
    }
    try{
        executor(resolve,reject)
    }catch(err){
        this.reason = err;
    }
    this.then = function(onFulfilled,onRejected){
        // 如果传参不是函数而是一个值，我们就把这个值改为返回自身的函数(then的参数可以只是一个值)
        onFulfilled = typeof onFulfilled==='function'?onFulfilled:v=>v;
        onRejected = typeof onRejected === 'function'?onRejected:err=>{throw err};
        
        let promise2 = new Promise((resolve,reject)=>{
            if(this.state === FULFILLED){
                // 这里应该是一个微任务，setTimeout是一个宏任务，在事件循环机制那里介绍过，then是一个微任务。这里是把then要执行的函数包装成一个异步函数
                setTimeout(()=>{
                    try{
                        let x = onFulfilled(this.value)
                        // 将x扔进resolvePromise中,帮我们resolve出来
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                },0)
            }else if(this.state === REJECTED){
                setTimeout(()=>{
                    try{
                        let x = onRejected(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                },0)
            }else{
                // 如果promise传入的函数里面是异步的,那我们需要在resolve或reject的时候调用onFulfilled或onRejected
                this.onResolvedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    },0)
                })
                this.onRejectedCallbacks.push(()=>{
                    setTimeout(()=>{
                        try{
                            let x = onRejected(this.reason)
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(x){
                            reject(x)
                        }
                    },0)
                })
            }
            
        })
        return promise2
    }
}
const promise = new Promise((resolve, reject) => {
    resolve('成功')
   }).then(
    (data) => {
      console.log('success', data)
      return new Promise((resolve,reject)=>{
        resolve(133)
      })
    },
    (err) => {
      console.log('faild', err)
    }
).then(1).then(val=>{
    console.log(val);
})
