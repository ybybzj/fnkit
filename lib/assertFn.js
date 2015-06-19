module.exports = function assertFn(fn){
  if(typeof fn !== 'function'){
    throw new TypeError('Function is expected here! But given: '+ fn);
  }
};