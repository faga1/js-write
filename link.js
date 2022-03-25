function func(){
    console.log(this);
    this.method1=()=>{
        console.log(1)
        return this
    }
    this.method2=()=>{
        console.log(2)
        return this
    }
}
function test (){
    console.log(this);
}
const cl = new func()
cl.method1().method2()