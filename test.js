for(var i=0;i<10;i++){
    setTimeout(()=>{
        console.log(i + "随机数" + Math.random())
    },0)
}
for(let i=0;i<10;i++){
    setTimeout(function(){
        console.log(this);
        console.log(i + "随机数" + Math.random())
    },0)
}