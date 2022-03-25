const fetch = require('node-fetch')

const axiosOriginal = {
    methods: ['get','post','put','delete','options'],
}
const axios = new Proxy(axiosOriginal,{
    set:function(){
        throw new Error('Can not set any property')
    },
    get(target,name){
        if(target.methods.indexOf(name)!==-1){
            console.log(name);
            return function(url,options){
                console.log(url);
                return fetch(url,{method:name,...options}).then(res=>{
                    return res.json()
                })
            }
        }else{
        }
    }
})

axios.get('http://localhost:3000/resumes/exist').then((val)=>{
    console.log(val);
})