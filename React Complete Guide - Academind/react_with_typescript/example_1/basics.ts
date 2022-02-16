// 1. PRIMITIVE TYPES -
// number, string, boolean, null, undefined

let age: number = 12;

let class_num: number;
class_num = 1;

let username: string = "asd";

let isInstructor: boolean = false;

// Note - Types jo mai specify kar raha hu wo LOWERCASE LETTER SE START HO RAHE HE.
// UPPERCASE LETTER se start hone wale JS Object hote he.

// Instrestingly, TS ke pass ek type hoti he "any" jo basically ye bolti he ki koi bhi type dedo us variable ko.

// 2. REFERENCE TYPES -
// Arrays and Objects

let hobbies: string[]; // -> Array of Strings
// hobbies = [1,2,"S"] -> Wrong
hobbies = ["a", "b", "c"];

// JS Objects ke liye mai sari fields ke names and types individually batata hu.
let person: {
  name: string;
  age: number;
  isAbove18: boolean;
};

person = {
  name: "madhur",
  age: 21,
  isAbove18: true,
};

let people: {
  name: string;
  age: number;
  isAbove18: boolean;
}[];

// ***************************************************

// TYPE INFERENCE IN TS -
// Automatic type detection by TS.

let course = "I am vengeance";
// Aisa karne se TS apne app ye sense kar leta he ki course variable string type ka hoga.
// course = 12; -> ye error dega as TS isko as a string rakha hua he aur maine number dediya.

// ***************************************************

// UNION TYPES in TS -
// Agr mai chahu ki ek variable mai string aur number dono allowed ho to I can use the union of types. Jitne chaho utne "types" ke union le sakte ho. Simply "|" char lagate jao.

let pincode: string | number;
// ab pincode mai string aur number dono stored honge.
pincode = "123";
pincode = 123;

// ***************************************************

// Giving "alais" names to complex types, in order to avoid redundancy in code -
// uses the "type" keyword of TS.

// Alias bana diya person ka
type Person = {
  name: string;
  age: number;
  isAbove18: boolean;
};

// us alias ko use karliya
let person2: Person;
let people2: Person[];

// ***************************************************

// Function and types -

function add2Nums(a: number, b: number) {
  // return type of this function pata lagane ke liye TS uses its type inference.
  return a + b;
}

// TS mai mai function ki return type bhi bata deta hu.
function sub2Nums(a: number, b: number): number {
  return a - b;
}

// Jaisa baki languages mai hota he ki agr function kuch ni return karta to uska return type void hota he, yahi same cheez TS mai bhi he.
function printOut(s: string): void {
  console.log(s);
}

// ***************************************************

// Generics in TS -
// Similar to class parameter in Java.

// insertAtBegining is a generic func. with parameter T
function insertAtBegining<T>(arr: T[], val: T): T[] {
  return [val, ...arr];
}

const numArr = insertAtBegining([1, 2, 3], -1); // will give number[]
const srtArr = insertAtBegining(["a", "b", "c"], "z"); // will give string[]

// Intresting - Array is also a generic type.
// Neeche ke dono commands same kaam karenge.
// let arr1: number[];
// let arr: Array<number>;
