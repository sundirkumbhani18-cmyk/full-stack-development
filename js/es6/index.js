let n=10;
{
    let n=2;
    console.log(n);
    
}
console.log(n);

let sum = (a,b)=>{
     return a+b;
}
console.log(sum(22,30));

let color = ["red","blue","green"];
let[x,y,z] = color
console.log(x);



let person={
    id:1,
    name:"ramesh",
    address:{
        country:"india",
        state:"gujarat",
        city:"surat",
        area:"bombay slam"   
    }

}

const {id,name,address}=person;
console.log(name,id,address);
