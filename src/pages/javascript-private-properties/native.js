class Person {
  #name; // 私有属性

  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }

  greet() {
    console.log(`hi, i'm ${this.#name} and i'm ${this.age} years old`);
  }
}

const person = new Person("bruce", 30);

console.log(person.name); // undefine

person.greet(); // hi, i'm bruce and i'm 30 years old