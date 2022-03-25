// 节流
function throttle(fn,delay){
    let time;
    return (...args)=>{
        let now = +new Date()
        if(!time||now-time>delay){
            fn.apply(this,args)
            time=now
        }
    }
}