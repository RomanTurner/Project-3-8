//todo CALL()

let obj = { num: 2 };
let obj2 = { num: 5 };

const addToThis = function (a, b, c) {
  return this.num + a + b + c;
};
//* this is the object that is passed as the argument

console.log(addToThis.call(obj, 1, 2, 3));
console.log(addToThis.call(obj2, 1, 2, 3));
//*functionName.call(Obj, functionParameters);

//todo APPLY()
//*functionName.call(Obj, parameterArray);
let arr = [1, 2, 3];

console.log(addToThis.apply(obj, arr));

//todo BIND()
//*functionName.call(Obj, parameterArray);
let bindExample = addToThis.bind(obj);
//binds the object parameter, now you can just pass different arguments.
console.dir(bindExample);

console.log(bindExample(1, 2, 3));

