var slice = require('./slice');
var assertFn = require('./lib/assertFn');
var reverse = module.exports = function reverse(fn){
  assertFn(fn);
  var arity = fn.length;
  return function reversed(){
    var args = slice(arguments, 0, arity).reverse(),
        rest = slice(arguments, arity);
    return fn.apply(this, args.concat(rest));
  };
};

//test
// if(require.main === module){
//   var arr = [1,2,3];
//   var curry = require('./curry');
//   var __ = require('./placeholder');
//   var fn = curry(2, reverse(function add(target,num){
//     console.log('target', target);
//     console.log('num', num);
//     console.log('rest', slice(arguments, 2));
//     return target + num;}))(3);
//   console.log(fn(1, 0));
//   console.log(fn(2, 1));
//   console.log(arr.map(fn));
//   // fn(1, 2);
//   // reverse(fn)(2,1);
// }