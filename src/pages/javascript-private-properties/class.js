class Person {
  constructor(name, age) {
    let _name = name; // 私有变量
    this.age = age;
    this.setName = function (name) {
      _name = name;
    };
    this.getName = function () {
      return _name;
    };
  }

  greet() {
    console.log(`hi, i'm ${this.getName()} and i'm ${this.age} years old`);
  }
}

const person = new Person("bruce", 30);

console.log(person.getName()); // bruce

person.setName("frank");

console.log(person.getName()); // frank

person.greet(); // hi, i'm frank and i'm 30 years old
