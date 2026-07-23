const msg = function(){
    return "hello danav";
}
console.log(msg());
//Immediately Invoked Function Expression (IIFE)
(function(){
    console.log(`hello world`);
    
})();

//Constructor Function
function person(name,age){
    this.name=name
    this.age=age
}
const user= new person("ram",23);
console.log(user.name);

//defult function

function students(name,age,collage="aau"){
    console.log(name);
    console.log(age);
    console.log(collage);
}
students(`ramesh`,22);
students(`vijay`,32);
students(`ram`,20,"jau")

//recursion 

// function sum(no){
//     if(no==0){
//         return 0;
//     }
//     return no+sum(no-1);
// }
// console.log(sum(5));

function mul(no){
    if(no==0){
        return 1;
    }
    return no*mul(no-1);
}
console.log(mul(7));


