// Configure RequireJS
require.config({
  baseUrl:'../src',
  urlArgs: "v="+(new Date()).getTime()
});

// Require libraries
require(['../vendor/chai', '../vendor/mocha'], function(chai){

  // Chai
  assert = chai.assert;
  should = chai.should();
  expect = chai.expect;

  // Mocha
  mocha.setup('bdd');

  // Require base tests before starting
  require([
    '../tests/test-inputstream',
    '../tests/test-process',
  ], 
  function(){
    // Start runner
    mocha.run();
  });

});
