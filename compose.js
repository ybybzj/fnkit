var pipe = require('./pipe');
var slice = require('./slice');
module.exports = function compose() {
  var args = slice(arguments).reverse();
  return pipe.apply(null, args);
};