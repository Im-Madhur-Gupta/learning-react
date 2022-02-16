// ES 6 - Old Way of writing class attributes and methods -
class Human {
  constructor() {
    this.gender = "male"; // gender field banai aur use "male" se initialize kar diya
  }
  printGender() {
    console.log(this.gender);
  }
}
class Person extends Human {
  constructor(name) {
    // IMPORTANT -
    // Java me mai agr child class ke constructor me super(....) ko call ni karta tha to wo by default parent class ke no argument constructor ko call kar leti thi.
    // JS me aisa ni hota, JS me mujhe hi parent class ke contructor ko call karna padta he child class ke constructor me, super(....) se.
    super();
    this.name = name; // name field banai aur use name se initialize kar diya
  }
  printMyName() {
    console.log(this.name);
  }
}

// **********************************************************************************************************

// ES 7 - Modern Way of writing class attributes and methods -
// Is tareke me constructor ko dhang se ni likh pate, constructor waise hi likhna theek he jaise pehle likha tha. Depends on situation.
class Human_new {
  gender = "male";
  // Arrow functions are used for methods, "this" keyword me problem ni ayegi
  printGender = () => console.log(this.gender);
}
class Person_new extends Human_new {
  name = "default";
  setName = (name) => {
    this.name = name;
  };
  printMyName = () => {
    console.log(this.name);
  };
}

const person1 = new Person_new("Madhur");
person1.setName("Madhur");
person1.printMyName();
person1.printGender();
