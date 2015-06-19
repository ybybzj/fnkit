var slice = require('./slice');
var assertFn = require('./lib/assertFn');
var pipe = module.exports = function pipe(){
  var fns = slice(arguments);
  fns.forEach(assertFn);
  return function piped(){
    var args = slice(arguments),
        i = 0, l = fns.length, fn, result = args;
    for(; i < l; i++){
      fn = fns[i];
      result = fn.apply(this, result);
      if(result && typeof result.then === 'function'){
        var rest = pipe.apply(null, slice(fns, i+1)).bind(this);
        return result.then(rest);;
      }else{
        result = [result];
      }
    }
    return result[0];
  };
}
//test
// if(require.main === module){
//   // var Promise = require('@zj/promise');
//   var delay = function(ms){
//     return function(v){
//       if(ms == 0) return Promise.reject(new Error('Invalid arguments'));
//       return new Promise(function(resolve){
//         setTimeout(resolve.bind(null, v), ms);
//       });
//     };
//   };
//   var add1s = function(a){return a + 1000;};
//   var add2s = function(a){return a + 2000;};
//   var print = function(v){
//     console.log(v);
//     return v;
//   }
//   var fn = pipe(print,print, print,print, print);
//   var result = fn('aa');
//   console.log(result instanceof Promise);
//   // console.log(fn(0));
// }