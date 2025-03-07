let value = 5;

function square() {
  return value * value;
}

square();

// node --allow-natives-syntax filename.js
// node --allow-natives-syntax --trace_opt --trace_deopt filename.js

// It is a V8 native
// command, and we can turn on execution of these types of functions by using the
// --allow-natives-syntax flag:
%OptimizeFunctionOnNextCall(square);
// value = 9.56;
square();
