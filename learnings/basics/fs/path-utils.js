const path = require("path");

console.log(path.normalize("../one////two/./three.html")); // ../one/two/three.html

console.log(path.join("../", "one", "two", "three.html")); // ../one/two/three.html

console.log(path.dirname("../one/two/three.html")); // ../one/two

console.log(path.basename("../one/two/three.html")); // three.html

console.log(path.basename("../one/two/three.html", ".html")); // three

console.log(path.extname("../one/two/three.html")); // .html

// find relative path from one absolute path to another
console.log(path.relative("/one/two/three/four", "/one/two/thumb/war")); // ../../thumb/war

// Think of the arguments passed to path.resolve as being a sequence of cd calls
console.log(path.resolve("/one/two", "/three/four")); // /three/four
console.log(path.resolve("/one/two/three", "../", "four", "../../five")); // /one/five
