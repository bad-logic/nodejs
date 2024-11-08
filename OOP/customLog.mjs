import util from 'node:util';

class Hello {
  #msg;
  #greet;
  constructor() {
    this.#msg = 'nice';
    this.#greet = false;
  }

  get msg() {
    return this.#msg;
  }

  set msg(msg) {
    this.#msg = msg;
  }

  get greet() {
    return this.#greet;
  }

  set greet(g) {
    this.#greet = g;
  }

  [util.inspect.custom]() {
    const tabSpace = '  ';
    return `Hello {\n${tabSpace}msg:${this.msg},\n${tabSpace}greet:${this.greet}\n}`;
  }
}

const map = new Map();
const obj = new Hello();
console.log(obj);

console.log({ a: obj.msg });

obj.msg = 'super nice';

console.log({ obj });
