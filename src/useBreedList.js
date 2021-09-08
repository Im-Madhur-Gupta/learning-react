// Our custom hook - We'll create custom hooks using other pre-made hooks in React
import { useState, useEffect } from "react";

const localcache = {};

// custom hooks is nothng special its just a function calling other hooks.
export default function useBreedList(animal) {
  const [breedlist, setBreedList] = useState([]);
  const [status,setStatus] = useState('unloaded');

  useEffect(()=>{

    // IMP - JS me (false, null, undefined, empty string '', 0, NaN) are all evaluated as Boolean False.
    if(!animal){ // check whether this would work for !animal.length 
      setBreedList([]);
    }
    else if(localcache[animal]){ // agr animal key ke corresponding localcache me value ho
      setBreedList(localcache[animal])
      // localcache is a JS object in which im trying to access the value corresponding to the animal key, as its a string I have to use this syntax and not the . one.
    }
    else{
      // animal ka data fetch karna padega.
      requestBreedList();
    }

    async function requestBreedList(){
      setBreedList([]); // maine fetch karne se pehle breedlist ko empty kar diya taki data merge na ho ex - maine cat ka fetch karke breedlist me dala phir maine dog ka fetch karke dala to cat aur dog ka data combine ho gaya which I don't want at all.
      setStatus("loading"); // I am currently loading data from api
  
      const res = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${animal}`);
      const json = await res.json(); // fecthed data has been converted from string (json) to JS object.
      
      localcache[animal] = json.breeds || []; // yaha maine ye kaha agr mera api ni chl raha he to [] empty array daldena localcache[animal] me.
      
      setBreedList(localcache[animal]);
      setStatus("loaded");
      }

  },[animal]) // ye useEffect wala hook mai tab re-run karunga jab mera animal change ho gaya hoga.

  return [breedlist,status];
}
