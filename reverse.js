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
