let FULFILLED = 'fulfilled'
let REJECTED = 'rejected'
let PENDING = 'pending'
function resolvePromise(promise2,x,resolve,reject){
    if(promise2===x) {
        return reject(new Error('Chaining cycle detected for promise #<Promise>'))
    }
    if(x instanceof myPromise){
        x.then(y=>{
            try{
                resolvePromise(promise2,y,resolve,reject)
            }catch(err){
                reject(err)
            }
        },r=>{
            reject(r)
        })
    }else{
        resolve(x)
    }
}
function myPromise(func){
    this.state = PENDING
    this.value = null;
    this.success;
    this.fail;
    let resolve = (val)=>{
        this.value=val;
        this.state = FULFILLED
        this.success&&this.success(val)
    }
    let reject = (err)=>{
        this.value=err;
        this.state = REJECTED
        this.fail&&this.fail(err)
    }
    try{
        func(resolve,reject)
    }catch(err){
        this.reason = err;
    }
    let that = this;
    this.then = function(successCallback,failCallback){
        successCallback = typeof successCallback ==='function'?successCallback:v=>v
        failCallback = typeof failCallback ==='function'?failCallback:err=>err

        let promise2 = new myPromise((resolve,reject)=>{
            if(this.state===FULFILLED){
                setTimeout(()=>{
                    try{
                        let x = successCallback(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }

                },0)
            }else if(this.state === REJECTED){
                setTimeout(()=>{
                    try{
                        let x = failCallback(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(err){
                        reject(err)
                    }
                },0)
                
            }else{
                this.success=()=>{
                    setTimeout(()=>{
                        try{
                            let x = successCallback(this.value)
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
    
                    },0)
                }
                this.fail=()=>{
                    setTimeout(()=>{
                        try{
                            let x = failCallback(this.value)
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(err){
                            reject(err)
                        }
                    },0)
                }
            }
            
        })
        return promise2
        
    }
}
const promise = new myPromise((resolve, reject) => {
    resolve('成功')
   }).then(
    (data) => {
      console.log('success', data)
      return new myPromise((resolve,reject)=>{
        resolve(133)
      })
    },
    (err) => {
      console.log('faild', err)
    }
).then(1).then(val=>{
    console.log(val);
})
