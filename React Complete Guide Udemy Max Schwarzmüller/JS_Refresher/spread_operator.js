let old_arr = [1,2,3,4,5]
let new_arr = [...old_arr,5,6]
// old_arr ke SARE elements utha lo, usme ye new elements add karlo and finally new_arr me daldo.
console.log(new_arr);


let old_obj = {
    ppt1:"123",
    ppt2:"234"
}
let new_obj = {
    ...old_obj,
    ppt1:"0",
    ppt3:"456"
}
// old_obj ke SARE key-value pairs utha lo, usme ye key-value pairs add/overwrite karlo and finally new_obj me daldo.
console.log(new_obj);