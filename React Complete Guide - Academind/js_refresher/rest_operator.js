// Kisi function ko agr variable number of arguments dene he to rest operator (...) ka use karta hu us function ki parameter list me.

function f1(...args){
    // sare arguments will be stored in an array called args
    return args.sort((a,b)=>a-b);
}
const f2 = (...args) => args.sort((a,b)=>b-a);
// sare arguments will be stored in an array called args

console.log(f1(45,1,3,89,-4));
console.log(f2(-45,1,3,89));
