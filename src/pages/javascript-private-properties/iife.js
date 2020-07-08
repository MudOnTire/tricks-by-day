/**
 * IIFE 实现
 */
let person = (function () {
  let _name = "bruce";
  return {
    age: 30,
    get name() {
      return _name;
    },
    set name(val) {
      _name = val;
    },
    greet: function(){
      console.log(`hi, i'm ${_name} and i'm ${this.age} years old`);
    }
  };
})();

console.log(person.name);
console.log(person._name);

person.name = "frank";

console.log(person.name);
 
console.log(Object.keys(person));

person.greet();

person.name = 'justin';

person.greet();