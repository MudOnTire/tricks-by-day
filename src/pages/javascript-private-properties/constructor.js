/**
 * 构造函数中实现
 */

function Person(name, age) {
  let _name = name; // 私有属性
  this.age = age;
  this.setName = function (name) {
    _name = name;
  };
  this.getName = function () {
    return _name;
  };
}

Person.prototype.greet = function (){
  console.log(`hi, i'm ${this.getName()} and i'm ${this.age} years old`);
}

const person = new Person("bruce", 30);

console.log(person.getName()); // bruce

person.setName('frank');

console.log(person.getName()); // frank

person.greet(); // hi, i'm frank and i'm 30 years old
