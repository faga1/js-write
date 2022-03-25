// 防抖
function debounce(fn,delay){
    let timer=null;
    return (...args)=>{
        console.log(args);
        timer&&clearTimeout(timer)
        timer=setTimeout(()=>{
            fn.apply(this,args)
            timer=null;
        },delay)
    }
}
function debouncePlus(fn,delay){
    let timer=null;
    return (...args)=>{
        if(timer){
            console.log('yes');
            clearTimeout(timer)
            timer=setTimeout(()=>{
                fn.apply(this,args)
                timer=null;
            },delay)
        }else{
            console.log('no');
            fn.apply(this,args)
            timer=setTimeout(()=>{
                timer=null;
            },delay)
        }

    }
}
function log(...args){
    console.log(args)
}