// nums [1,2,4,5,6] target 9

const { builtInTypes, namedTypes } = require("ast-types");

function sum(nums,target){
    var i,j;
    var index1,index2;
    let map = new Map()
    for(i=0;i<nums.length-1;i++){
       map.set(nums[i],i); 
       if(map.get(target - nums[i])){
           return [map.get(target - nums[i]),i];
       }
    }
    
    return [index1,index2];
}
console.log(sum([1,2,3,4,5,6],7));