"use strict";

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);
  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);
  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
  return value;
}

var _name = new WeakMap();

class Person {
  constructor(name, age) {
    _name.set(this, {
      writable: true,
      value: void 0,
    });

    _classPrivateFieldSet(this, _name, name);

    this.age = age;
  }

  greet() {
    console.log(
      "hi, i'm "
        .concat(_classPrivateFieldGet(this, _name), " and i'm ")
        .concat(this.age, " years old")
    );
  }
}
