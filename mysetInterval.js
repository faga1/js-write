function mysetInterval(fn,a,b){
    let timer=null;
    let date = new Date().valueOf()
    function myTimeout(a,b,fn,date){
        timer = setTimeout(()=>{
            let now=new Date().valueOf()
            console.log(now-date);
            fn()
            myTimeout(a+b,b,fn,date)
        },a+b)
    }
    return ()=>{
        myTimeout(a,b,fn,date)
    }
}
function myTimeout(timer,count,a,b,fn,date){
    timer = setTimeout(()=>{
        let now=new Date().valueOf()
        console.log(now-date);
        fn()
        count++;
        myTimeout(timer,count,a,b,fn,date)
    },a+b*count)
}
function myclear(){
    clearTimeout(timer)
}
mysetInterval(()=>{console.log('hello')},1000,500)()